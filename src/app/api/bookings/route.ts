import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createCheckoutSession, isStripeConfigured } from "@/lib/stripe";
import { confirmBookingAndNotify } from "@/lib/bookings";
import { detectCrisisLanguage } from "@/lib/utils";
import { normalizeMeetingLink } from "@/lib/meeting-links";

const bookingSchema = z.object({
  providerSlug: z.string(),
  sessionTypeId: z.string(),
  scheduledAt: z.string(),
  category: z.string(),
  topic: z.string().optional(),
  denominationPref: z.string().optional(),
  priorRabbiExperience: z.string().optional(),
  notes: z.string().optional(),
  userTimezone: z.string().optional(),
  disclaimerAccepted: z.string(),
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Sign in required" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid booking data" }, { status: 400 });
    }

    const data = parsed.data;
    const topicText = data.topic?.trim() ?? "";
    const combinedText = [topicText, data.notes].filter(Boolean).join(" ");

    if (detectCrisisLanguage(combinedText)) {
      return NextResponse.json({ crisisBlocked: true }, { status: 422 });
    }

    const provider = await prisma.provider.findUnique({
      where: { slug: data.providerSlug, status: "APPROVED" },
      include: { user: true, sessionTypes: true },
    });

    if (!provider) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    const sessionType = provider.sessionTypes.find((s) => s.id === data.sessionTypeId);
    if (!sessionType) {
      return NextResponse.json({ error: "Session type not found" }, { status: 404 });
    }

    if (!provider.meetingLink) {
      return NextResponse.json(
        { error: "This guide has not set up a meeting link yet. Please try again later." },
        { status: 422 },
      );
    }

    const dbUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!dbUser) {
      return NextResponse.json(
        {
          error:
            "Your session is out of date. Please sign out and sign in again, then retry your booking.",
        },
        { status: 401 },
      );
    }

    const scheduledAt = new Date(data.scheduledAt);
    const videoRoomUrl = normalizeMeetingLink(provider.meetingLink);

    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        providerId: provider.id,
        sessionTypeId: sessionType.id,
        scheduledAt,
        status: isStripeConfigured() ? "PENDING" : "CONFIRMED",
        category: data.category,
        topic: topicText || "To be discussed in session",
        denominationPref: data.denominationPref || null,
        priorRabbiExperience: data.priorRabbiExperience || null,
        notes: data.notes || null,
        disclaimerAccepted: data.disclaimerAccepted === "true",
        videoRoomUrl,
      },
    });

    if (data.userTimezone) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { timezone: data.userTimezone },
      });
    }

    const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

    if (isStripeConfigured()) {
      const checkout = await createCheckoutSession({
        bookingId: booking.id,
        priceCents: sessionType.priceCents,
        providerStripeAccountId: provider.stripeAccountId,
        customerEmail: dbUser.email,
        description: `${sessionType.name} with ${provider.user.name}`,
        successUrl: `${baseUrl}/dashboard/bookings/${booking.id}?confirmed=1`,
        cancelUrl: `${baseUrl}/scholars/${provider.slug}/book`,
      });

      if (checkout.sessionId) {
        await prisma.booking.update({
          where: { id: booking.id },
          data: { stripeSessionId: checkout.sessionId },
        });
      }

      return NextResponse.json({ bookingId: booking.id, checkoutUrl: checkout.url });
    }

    await confirmBookingAndNotify(booking.id);
    return NextResponse.json({ bookingId: booking.id, demo: true });
  } catch (error) {
    console.error("[bookings] POST failed:", error);
    return NextResponse.json(
      { error: "Something went wrong while creating your booking. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: {
      provider: { include: { user: { select: { name: true } } } },
      sessionType: true,
    },
    orderBy: { scheduledAt: "desc" },
  });

  return NextResponse.json(bookings);
}
