import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PageShell, Card } from "@/components/ui";
import { ProviderMeetingLinkForm } from "@/components/ProviderMeetingLinkForm";
import { ProviderStripeConnect } from "@/components/ProviderStripeConnect";
import { detectMeetingLinkType, meetingLinkLabel } from "@/lib/meeting-links";
import { GUIDE_PAYOUT_PERCENT } from "@/lib/constants";
import { formatCents, calculateProviderPayout } from "@/lib/utils";
import { format } from "date-fns";

export default async function ProviderDashboardPage() {
  const session = await auth();
  if (!session?.user?.providerId) redirect("/dashboard");

  const provider = await prisma.provider.findUnique({
    where: { id: session.user.providerId },
    include: {
      user: true,
      sessionTypes: true,
      bookings: {
        include: {
          sessionType: true,
          user: { select: { name: true } },
        },
        orderBy: { scheduledAt: "desc" },
        take: 20,
      },
    },
  });

  if (!provider) redirect("/dashboard");

  const earnings = provider.bookings
    .filter((b) => b.status === "CONFIRMED" || b.status === "COMPLETED")
    .reduce((sum, b) => sum + calculateProviderPayout(b.sessionType.priceCents), 0);

  const linkType = provider.meetingLink
    ? detectMeetingLinkType(provider.meetingLink)
    : null;

  return (
    <PageShell title="Provider dashboard" subtitle={`Welcome, ${provider.user.name}`}>
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-2xl font-semibold">{provider.bookings.length}</p>
          <p className="text-sm text-stone-500">Total sessions</p>
        </Card>
        <Card>
          <p className="text-2xl font-semibold">{formatCents(earnings)}</p>
          <p className="text-sm text-stone-500">Est. earnings ({GUIDE_PAYOUT_PERCENT}% split)</p>
        </Card>
        <Card>
          <p className="text-2xl font-semibold">{provider.status}</p>
          <p className="text-sm text-stone-500">Profile status</p>
        </Card>
      </div>

      <section className="mb-10">
        <Card>
          <h2 className="text-lg font-medium text-stone-900">Meeting link</h2>
          <p className="mt-2 text-sm text-stone-600">
            Sessions use your personal Zoom or Google Meet link. Users receive this link after
            booking so they can join your room at the scheduled time.
          </p>
          {linkType && (
            <p className="mt-2 text-xs text-stone-500">
              Current: {meetingLinkLabel(linkType)} link on file
            </p>
          )}
          <div className="mt-4">
            <ProviderMeetingLinkForm currentLink={provider.meetingLink} />
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-lg font-medium">Your session types</h2>
        <div className="mt-4 space-y-2">
          {provider.sessionTypes.map((s) => (
            <Card key={s.id}>
              <p className="font-medium">{s.name}</p>
              <p className="text-sm text-stone-500">
                {s.durationMin} min · {formatCents(s.priceCents)} · You earn{" "}
                {formatCents(calculateProviderPayout(s.priceCents))}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium">Recent bookings</h2>
        {provider.bookings.length === 0 ? (
          <p className="mt-2 text-sm text-stone-500">No bookings yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {provider.bookings.map((b) => (
              <Card key={b.id}>
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-medium">{b.user.name}</p>
                    <p className="text-sm text-stone-500">{format(b.scheduledAt, "PPP p")}</p>
                    <p className="text-sm text-stone-500">
                      {b.category}: {b.topic.slice(0, 80)}
                      {b.topic.length > 80 ? "..." : ""}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <p>{b.status}</p>
                    {provider.meetingLink && (
                      <a
                        href={provider.meetingLink}
                        className="text-amber-800 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Your {meetingLinkLabel(detectMeetingLinkType(provider.meetingLink))} link
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Card className="mt-8">
        <p className="font-medium">Stripe Connect</p>
        <ProviderStripeConnect />
      </Card>
    </PageShell>
  );
}
