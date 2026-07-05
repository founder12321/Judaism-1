import Link from "next/link";
import { PastoralBoundaryNotice } from "@/components/PastoralBoundaryNotice";
import { FindGuideFlow } from "@/components/FindGuideFlow";
import {
  EMERGENCY_NOTICE,
  HEBREW_TAGLINE,
  HERO_HEADLINE,
  HERO_SUBHEADLINE,
  PRICING_LINE,
  TRUST_LINE,
} from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-amber-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-stone-900 md:text-5xl">
              {HERO_HEADLINE}
            </h1>
            <p className="mt-5 text-lg text-stone-600">{HERO_SUBHEADLINE}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/find"
                className="rounded-full bg-amber-800 px-6 py-3 text-sm font-medium text-white hover:bg-amber-900"
              >
                Find a guide
              </Link>
              <Link
                href="/scholars"
                className="rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
              >
                Browse all guides
              </Link>
              <Link
                href="/apply"
                className="rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
              >
                Apply as a guide
              </Link>
            </div>
            <p className="mt-4 text-sm font-medium text-stone-700">{TRUST_LINE}</p>
            <p className="mt-2 text-xs text-stone-500">{PRICING_LINE}</p>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <PastoralBoundaryNotice compact />
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-amber-800">
                How it works
              </p>
              <ol className="mt-4 space-y-3 text-sm text-stone-600">
                <li>1. Choose what you need guidance on</li>
                <li>2. Pick a guide and book a time</li>
                <li>3. Join your private video session from your dashboard</li>
              </ol>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
              <FindGuideFlow />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-semibold text-stone-900">Common topics</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Talk to a rabbi online", href: "/topics/talk-to-a-rabbi-online" },
            { label: "Jewish grief support", href: "/topics/jewish-grief-support" },
            { label: "Conversion guidance", href: "/topics/jewish-conversion-guidance" },
            { label: "Interfaith relationships", href: "/topics/interfaith-relationship-guidance" },
            { label: "Jewish parenting", href: "/topics/jewish-parenting-guidance" },
            { label: "Antisemitism support", href: "/topics/antisemitism-support" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-stone-200 px-4 py-3 text-sm font-medium text-stone-800 hover:border-amber-300 hover:bg-amber-50"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link href="/topics" className="mt-4 inline-block text-sm font-medium text-amber-800 underline">
          View all topics
        </Link>
      </section>

      <section className="border-y border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl font-semibold text-stone-900">Why Judaism 1</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Vetted guides",
                body: "Rabbis, scholars, chaplains, and educators reviewed for credentials, experience, and fit for one-on-one guidance.",
              },
              {
                title: "No membership required",
                body: "Book a private session on your schedule. Choose background and topics that fit you.",
              },
              {
                title: "Clear boundaries",
                body: "Pastoral guidance and Jewish learning — not therapy, medical care, or emergency services.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-stone-200 bg-white p-5">
                <h3 className="font-medium text-stone-900">{item.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 text-center">
        <p className="text-sm text-stone-500">
          {HEBREW_TAGLINE} · &ldquo;Appoint for yourself a rabbi.&rdquo; (Avot 1:6)
        </p>
        <p className="mt-4 text-sm text-stone-600">{EMERGENCY_NOTICE}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/faq" className="text-sm font-medium text-amber-800 underline">
            FAQ
          </Link>
          <Link href="/about" className="text-sm font-medium text-amber-800 underline">
            About
          </Link>
          <Link href="/legal/disclaimer" className="text-sm font-medium text-amber-800 underline">
            Session disclaimer
          </Link>
        </div>
      </section>
    </>
  );
}
