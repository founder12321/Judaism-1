import Link from "next/link";
import { PageShell } from "@/components/ui";
import { FindGuideFlow } from "@/components/FindGuideFlow";
import { PastoralBoundaryNotice } from "@/components/PastoralBoundaryNotice";

export default function FindPage() {
  return (
    <PageShell
      title="Find a guide"
      subtitle="One question, then bookable guides. No account required to browse."
    >
      <div className="mx-auto max-w-2xl space-y-6">
        <PastoralBoundaryNotice compact />
        <FindGuideFlow />
        <p className="text-center text-xs text-stone-500">
          <Link href="/scholars" className="underline">
            Browse all guides
          </Link>
          {" · "}
          <Link href="/faq" className="underline">
            FAQ
          </Link>
        </p>
      </div>
    </PageShell>
  );
}
