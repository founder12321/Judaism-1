import Link from "next/link";
import { DisclaimerBanner } from "@/components/ui";
import {
  CATEGORY,
  HEBREW_TAGLINE,
  HERO_HEADLINE,
  TAGLINE,
} from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-amber-50 to-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-amber-800">
              {CATEGORY}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-900 md:text-5xl">
              {HERO_HEADLINE}
            </h1>
            <p className="mt-3 text-base font-medium text-amber-900">
              {HEBREW_TAGLINE} · &ldquo;Appoint for yourself a rabbi.&rdquo; (Avot 1:6)
            </p>
            <p className="mt-5 text-lg text-stone-600">
              {TAGLINE} More Jews identify as Jewish than belong to a synagogue. The questions
              that matter most still arrive in ordinary time: before an engagement, after a loss,
              when a child asks about God, when you want to begin keeping Shabbat. Judaism 1
              connects you with a credentialed rabbi or scholar for a private video session,
              matched to your denomination and your need.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/scholars"
                className="rounded-full bg-amber-800 px-6 py-3 text-sm font-medium text-white hover:bg-amber-900"
              >
                Find a guide
              </Link>
              <Link
                href="/beta"
                className="rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
              >
                Join the beta
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <DisclaimerBanner />
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-stone-900">How it works</p>
              <ol className="mt-4 space-y-3 text-sm text-stone-600">
                <li>1. Browse vetted guides by denomination and specialty</li>
                <li>2. Choose an open time from their calendar and book the session</li>
                <li>3. Join via Zoom or Google Meet from your dashboard</li>
              </ol>
              <p className="mt-4 text-xs text-stone-500">
                No membership required. Sessions from $75. Pastoral guidance, not therapy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-center text-2xl font-semibold text-stone-900">
            Why now
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "The access gap",
                body: "Synagogue life anchors community. Many Jews today have no regular rabbi to call when something important unfolds between holidays.",
              },
              {
                title: "Ordinary time",
                body: "Life does not wait for office hours. A private hour with the right guide can bring clarity when you need it, not when the calendar allows.",
              },
              {
                title: "Built for trust",
                body: "Every guide is credentialed and vetted. You choose denomination and specialty. The conversation is confidential, one-to-one, on video.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center md:text-left">
                <h3 className="font-medium text-stone-900">{item.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold text-stone-900">
          You may find this meaningful if...
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "You are building a Jewish life on your own",
              body: "You moved cities, stepped back from a congregation, or are exploring what Judaism means to you. You deserve thoughtful guidance, not scattered answers online.",
            },
            {
              title: "You want a rabbi without the membership barrier",
              body: "You may love your community and still want a dedicated private session on a sensitive topic, at a time you choose, with someone matched to your background.",
            },
            {
              title: "Something important is unfolding now",
              body: "An engagement, a loss in the family, beginning to observe mitzvot, a teenager questioning tradition. One focused conversation with the right guide can bring clarity and peace of mind.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-stone-200 p-6">
              <h3 className="font-medium text-stone-900">{item.title}</h3>
              <p className="mt-2 text-sm text-stone-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-stone-200 bg-amber-50">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center">
          <p className="text-lg font-medium text-amber-950">
            Pastoral guidance, not therapy. Confidential. Denomination-matched.
          </p>
          <p className="mt-2 text-sm text-amber-900">
            Judaism 1 complements your synagogue and community. It does not replace them.{" "}
            <Link href="/about" className="font-medium underline">
              Read our mission
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-stone-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-semibold">Sessions often focus on</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Marriage and engagement",
              "Raising a Jewish home",
              "Career and purpose",
              "Grief and mourning",
              "Beginning to observe mitzvot",
              "Reconnecting with Jewish life",
            ].map((topic) => (
              <div key={topic} className="rounded-lg bg-stone-800 px-4 py-3 text-sm">
                {topic}
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/scholars"
              className="inline-block rounded-full bg-amber-600 px-6 py-3 text-sm font-medium hover:bg-amber-500"
            >
              Browse guides
            </Link>
            <Link
              href="/learnings"
              className="inline-block rounded-full border border-stone-600 px-6 py-3 text-sm font-medium hover:bg-stone-800"
            >
              Explore topics
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-stone-900">For rabbis and scholars</h2>
        <p className="mx-auto mt-4 max-w-2xl text-stone-600">
          We are recruiting founding guides across denominations. Featured placement, flexible
          scheduling, and an 82% revenue share. You keep your own Zoom or Google Meet link.
        </p>
        <Link
          href="/apply"
          className="mt-6 inline-block rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          Apply as a founding guide
        </Link>
      </section>
    </>
  );
}
