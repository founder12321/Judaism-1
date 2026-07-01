import { PageShell } from "@/components/ui";
import { ProviderApplicationForm } from "@/components/Forms";

export default function ApplyPage() {
  return (
    <PageShell
      title="Become a founding guide"
      subtitle="Help build the first marketplace for private Jewish pastoral care. Founding guides receive featured placement."
    >
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-xl border border-stone-200 bg-stone-50 p-5 text-sm text-stone-600">
          <p className="font-medium text-stone-900">Why join now</p>
          <p className="mt-2">
            More Jews identify as Jewish than belong to a synagogue. Many have no rabbi to call
            when life asks a Jewish question. Judaism 1 connects them with credentialed guides
            for private video sessions. We need supply before we open to the public.
          </p>
          <p className="mt-3 font-medium text-stone-900">Vetting process</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>Application review and credential verification</li>
            <li>Reference check (1–2 colleagues or congregants)</li>
            <li>Background check</li>
            <li>Platform boundary training (pastoral vs. clinical)</li>
            <li>Profile approval and featured placement for founding guides</li>
          </ol>
          <p className="mt-3">
            You keep 82% of each session. Add your own Zoom or Google Meet link in your provider
            dashboard. Connect Stripe to receive payouts automatically.
          </p>
        </div>
        <ProviderApplicationForm />
      </div>
    </PageShell>
  );
}
