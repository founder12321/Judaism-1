import Link from "next/link";
import { PageShell } from "@/components/ui";
import { PastoralBoundaryNotice } from "@/components/PastoralBoundaryNotice";
import {
  HEBREW_TAGLINE,
  HERO_HEADLINE,
  HERO_SUBHEADLINE,
  PRICING_LINE,
} from "@/lib/constants";

export default function AboutPage() {
  return (
    <PageShell title="About Judaism 1" subtitle={HERO_SUBHEADLINE}>
      <div className="mx-auto max-w-3xl space-y-10">
        <PastoralBoundaryNotice compact />

        <section>
          <h2 className="text-xl font-semibold text-stone-900">What we are</h2>
          <p className="mt-3 text-stone-600">
            Judaism 1 is a booking platform for private one-on-one sessions with vetted rabbis,
            Jewish scholars, chaplains, and educators. {HERO_HEADLINE.replace(".", "")} on your
            schedule, by video, without synagogue membership.
          </p>
          <p className="mt-3 text-sm text-stone-500">{PRICING_LINE}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">Who it is for</h2>
          <ul className="mt-4 space-y-3 text-stone-600">
            <li>Jews navigating life transitions who want counsel rooted in Jewish tradition</li>
            <li>People reconnecting with Judaism who want a patient guide, not a classroom</li>
            <li>Anyone seeking a private conversation on a sensitive topic at a time they choose</li>
            <li>Parents, couples, students, and professionals with specific Jewish questions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">What we are not</h2>
          <p className="mt-3 text-stone-600">
            Judaism 1 provides Jewish pastoral guidance, learning, and spiritual support. It is
            not therapy, medical care, legal advice, emergency counseling, or crisis intervention.
            We complement synagogue and community life; we do not replace them.
          </p>
        </section>

        <section className="rounded-xl border border-stone-200 bg-stone-50 p-5 text-sm text-stone-600">
          <p>
            {HEBREW_TAGLINE} · &ldquo;Appoint for yourself a rabbi.&rdquo; (Avot 1:6) — a traditional
            reminder that Jewish wisdom is meant to be personal, not only institutional.
          </p>
        </section>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/find"
            className="rounded-full bg-amber-800 px-6 py-3 text-sm font-medium text-white hover:bg-amber-900"
          >
            Find a guide
          </Link>
          <Link
            href="/faq"
            className="rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            FAQ
          </Link>
          <Link
            href="/apply"
            className="rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            Apply as a guide
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
