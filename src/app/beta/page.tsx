import Link from "next/link";
import { PageShell } from "@/components/ui";
import { BetaSignupForm } from "@/components/Forms";

export default function BetaPage() {
  return (
    <PageShell
      title="Join the beta"
      subtitle="Early access to private pastoral guidance with founding guides. First sessions discounted."
    >
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        <BetaSignupForm />
        <div className="space-y-4 text-sm text-stone-600">
          <p className="font-medium text-stone-900">What you get</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Early access when founding guides go live</li>
            <li>$20 off your first session</li>
            <li>A direct role in shaping the platform with post-session feedback</li>
            <li>One invite email when we open. No newsletter spam.</li>
          </ul>
          <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-950">
            Judaism 1 is pastoral guidance with a vetted rabbi or scholar, not therapy. If you are
            in crisis, call or text 988.
          </p>
          <p className="pt-2">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-800 underline">Sign in</Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
