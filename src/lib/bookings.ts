import { prisma } from "@/lib/db";
import { sendBookingConfirmationEmails } from "@/lib/email";

export async function confirmBookingAndNotify(bookingId: string, stripeSessionId?: string) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      user: true,
      provider: { include: { user: true } },
      sessionType: true,
    },
  });

  if (!booking) {
    throw new Error(`Booking not found: ${bookingId}`);
  }

  if (booking.status === "CONFIRMED") {
    return booking;
  }

  const updated = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: "CONFIRMED",
      stripeSessionId: stripeSessionId ?? booking.stripeSessionId,
    },
    include: {
      user: true,
      provider: { include: { user: true } },
      sessionType: true,
    },
  });

  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  if (updated.videoRoomUrl) {
    await sendBookingConfirmationEmails({
      bookingId: updated.id,
      userName: updated.user.name,
      userEmail: updated.user.email,
      providerName: updated.provider.user.name,
      providerEmail: updated.provider.user.email,
      sessionName: updated.sessionType.name,
      scheduledAt: updated.scheduledAt,
      topic: updated.topic,
      meetingLink: updated.videoRoomUrl,
      dashboardUrl: `${baseUrl}/dashboard/bookings/${updated.id}`,
    });
  }

  return updated;
}
