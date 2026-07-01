import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageShell, Badge, DisclaimerBanner } from "@/components/ui";
import { detectMeetingLinkType, meetingLinkLabel } from "@/lib/meeting-links";
import {
  denominationLabel,
  formatCents,
  formatTimezoneLabel,
  parseList,
  tierLabel,
  genderLabel,
} from "@/lib/utils";

export default async function ScholarProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const provider = await prisma.provider.findUnique({
    where: { slug, status: "APPROVED" },
    include: {
      user: { select: { name: true } },
      sessionTypes: { orderBy: { priceCents: "asc" } },
    },
  });

  if (!provider) notFound();

  const meetingType = provider.meetingLink
    ? detectMeetingLinkType(provider.meetingLink)
    : null;

  return (
    <PageShell title={provider.user.name} subtitle={`${provider.title} · ${tierLabel(provider.tier)}`}>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <DisclaimerBanner compact />

          <div className="flex flex-wrap gap-2">
            <Badge>{denominationLabel(provider.denomination)}</Badge>
            {provider.featured && <Badge>Founding Guide</Badge>}
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6">
            <h2 className="font-medium text-stone-900">About</h2>
            <p className="mt-3 text-stone-600">{provider.bio}</p>
            {provider.ordinationBody && (
              <p className="mt-4 text-sm text-stone-500">
                Credentials: {provider.ordinationBody}
              </p>
            )}
            <p className="mt-2 text-sm text-stone-500">
              Approach reflects {denominationLabel(provider.denomination)} movement norms
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6">
            <h2 className="font-medium text-stone-900">Specialties</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {parseList(provider.specialties).map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-stone-200 bg-white p-6">
            <p className="text-sm text-stone-500">★ {provider.rating.toFixed(1)} · {provider.reviewCount} sessions</p>
            <p className="mt-2 text-sm text-stone-500">{genderLabel(provider.gender)} guide</p>
            <p className="mt-1 text-sm text-stone-500">
              Based in {formatTimezoneLabel(provider.timezone)}
            </p>
            {meetingType && meetingType !== "unknown" && (
              <p className="mt-1 text-sm text-stone-500">
                Sessions via {meetingLinkLabel(meetingType)}
              </p>
            )}

            <h3 className="mt-6 font-medium text-stone-900">Session options</h3>
            <ul className="mt-3 space-y-3">
              {provider.sessionTypes.map((session) => (
                <li key={session.id} className="flex items-center justify-between text-sm">
                  <span>
                    {session.name} · {session.durationMin} min
                  </span>
                  <span className="font-medium">{formatCents(session.priceCents)}</span>
                </li>
              ))}
            </ul>

            {provider.meetingLink ? (
              <Link
                href={`/scholars/${provider.slug}/book`}
                className="mt-6 block rounded-full bg-amber-800 py-3 text-center text-sm font-medium text-white hover:bg-amber-900"
              >
                Book a session
              </Link>
            ) : (
              <p className="mt-6 rounded-lg bg-stone-100 px-4 py-3 text-center text-sm text-stone-600">
                Booking is temporarily unavailable for this guide.
              </p>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
