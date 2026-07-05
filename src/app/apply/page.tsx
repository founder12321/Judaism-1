import { PageShell } from "@/components/ui";
import { ProviderApplicationForm } from "@/components/Forms";
import { GUIDE_PAYOUT_PERCENT, PLATFORM_FEE_PERCENT } from "@/lib/constants";
import { PastoralBoundaryNotice } from "@/components/PastoralBoundaryNotice";

export default function ApplyPage() {
  return (
    <PageShell
      title="Become a founding guide"
      subtitle="Help build the first marketplace for private Jewish pastoral care. Founding guides receive featured placement."
    >
      <div className="mx-auto max-w-2xl space-y-6">
        <PastoralBoundaryNotice compact />

        <div className="rounded-xl border border-stone-200 bg-stone-50 p-5 text-sm text-stone-600 space-y-4">
          <div>
            <p className="font-medium text-stone-900">Who should apply</p>
            <p className="mt-2">
              Ordained rabbis, Jewish scholars, chaplains, and educators with meaningful pastoral
              experience and credentials appropriate to your role. We welcome guides across
              denominations who can offer thoughtful one-on-one guidance.
            </p>
          </div>

          <div>
            <p className="font-medium text-stone-900">What Judaism 1 handles</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Discovery and profile placement</li>
              <li>Booking and scheduling</li>
              <li>Payments through Stripe</li>
              <li>User intake before sessions</li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-stone-900">What you provide</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Your Zoom or Google Meet link</li>
              <li>Availability and session types</li>
              <li>Pastoral sessions within Judaism 1 boundaries</li>
              <li>Stripe Connect account for payouts</li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-stone-900">Compensation</p>
            <p className="mt-2">
              You keep <strong>{GUIDE_PAYOUT_PERCENT}%</strong> of each session fee. Judaism 1
              retains a {PLATFORM_FEE_PERCENT}% platform fee. Payouts are processed through Stripe
              Connect after completed sessions.
            </p>
          </div>

          <div>
            <p className="font-medium text-stone-900">Pastoral-care boundaries</p>
            <p className="mt-2">
              Guides provide Jewish pastoral guidance and learning, not psychotherapy, medical
              care, legal advice, or crisis intervention. You agree to refer users to appropriate
              professionals when clinical, legal, or emergency support is needed.
            </p>
          </div>

          <div>
            <p className="font-medium text-stone-900">Vetting process</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>Application and credential review</li>
              <li>Reference check (1–2 colleagues or congregants)</li>
              <li>Background check</li>
              <li>Boundary training (pastoral vs. clinical)</li>
              <li>Profile approval and featured placement for founding guides</li>
            </ol>
          </div>
        </div>

        <ProviderApplicationForm />
      </div>
    </PageShell>
  );
}
