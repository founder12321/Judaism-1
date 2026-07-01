import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PageShell, Card, DisclaimerBanner } from "@/components/ui";
import { detectMeetingLinkType, meetingLinkLabel } from "@/lib/meeting-links";
import { formatCents } from "@/lib/utils";
import { format } from "date-fns";

export default async function BookingDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ confirmed?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { id } = await params;
  const { confirmed } = await searchParams;

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      provider: { include: { user: { select: { name: true } } } },
      sessionType: true,
      user: { select: { name: true, email: true } },
    },
  });

  if (!booking || booking.userId !== session.user.id) {
    redirect("/dashboard");
  }

  return (
    <PageShell title="Session details" subtitle={`With ${booking.provider.user.name}`}>
      {confirmed && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
          Your session is confirmed. A confirmation email has been sent with your meeting link. You can also join from this page at your scheduled time.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-stone-500">Guide</dt>
              <dd className="font-medium">{booking.provider.user.name}</dd>
            </div>
            <div>
              <dt className="text-stone-500">When</dt>
              <dd className="font-medium">{format(booking.scheduledAt, "PPPP p")}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Session</dt>
              <dd>{booking.sessionType.name} · {booking.sessionType.durationMin} min · {formatCents(booking.sessionType.priceCents)}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Category</dt>
              <dd>{booking.category}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Your topic</dt>
              <dd>{booking.topic}</dd>
            </div>
            {booking.notes && (
              <div>
                <dt className="text-stone-500">Notes for guide</dt>
                <dd>{booking.notes}</dd>
              </div>
            )}
          </dl>
        </Card>

        <div className="space-y-4">
          <DisclaimerBanner compact />

          {booking.videoRoomUrl && booking.status === "CONFIRMED" && (
            <Card>
              <h3 className="font-medium text-stone-900">Join your session</h3>
              <p className="mt-2 text-sm text-stone-600">
                {booking.provider.user.name} hosts sessions on{" "}
                {meetingLinkLabel(detectMeetingLinkType(booking.videoRoomUrl))}. Use the link below
                at your scheduled time.
              </p>
              <a
                href={booking.videoRoomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-full bg-amber-800 px-5 py-2 text-sm font-medium text-white hover:bg-amber-900"
              >
                Open {meetingLinkLabel(detectMeetingLinkType(booking.videoRoomUrl))} link
              </a>
            </Card>
          )}

          <Link
            href={`/scholars/${booking.provider.slug}/book`}
            className="inline-block text-sm text-amber-800 underline"
          >
            Book another session with {booking.provider.user.name}
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
