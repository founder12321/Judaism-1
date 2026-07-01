import Link from "next/link";
import { PageShell } from "@/components/ui";
import {
  CATEGORY,
  HEBREW_TAGLINE,
  HERO_HEADLINE,
  TAGLINE,
} from "@/lib/constants";

export default function AboutPage() {
  return (
    <PageShell
      title="The Mission"
      subtitle={CATEGORY}
    >
      <div className="mx-auto max-w-3xl space-y-10">
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-2xl font-semibold text-amber-950">{HERO_HEADLINE}</p>
          <p className="mt-2 text-sm text-amber-900">
            {HEBREW_TAGLINE}. &ldquo;Appoint for yourself a rabbi.&rdquo; (Avot 1:6)
          </p>
          <p className="mt-4 text-amber-950">{TAGLINE}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">The gap we exist to fill</h2>
          <p className="mt-3 text-stone-600">
            Synagogue life gives us Shabbat, holidays, and shared ritual. It anchors us. Yet more
            Jews identify as Jewish than belong to a congregation. The questions that shape our
            lives often arrive quietly: before an engagement, after a diagnosis, when a child
            asks about God, when you wonder whether you are living in alignment with the values
            you were raised with.
          </p>
          <p className="mt-3 text-stone-600">
            You may have a rabbi you respect. You may not. Either way, there are moments when you
            want an unhurried hour with someone who understands Jewish tradition and can meet you
            where you are. Judaism 1 is private pastoral guidance for those moments.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">What we offer</h2>
          <p className="mt-3 text-stone-600">
            Judaism 1 is a marketplace for one-to-one pastoral sessions with vetted rabbis and
            Torah scholars. You choose someone whose denomination and background reflect your own.
            You select a time from their available calendar. You share, in advance, what you hope
            to discuss. After booking, your guide&apos;s Zoom or Google Meet link appears on your
            dashboard.
          </p>
          <p className="mt-3 text-stone-600">
            Sessions may focus on life guidance (relationships, parenting, grief, work), Jewish
            learning (Shabbat, kashrut, holidays, text study), or questions of identity and
            belonging. Every guide is credentialed and vetted. Every session is confidential.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">Why now</h2>
          <ul className="mt-4 space-y-3 text-stone-600">
            <li>
              <strong className="text-stone-800">Access:</strong> Many Jews have no regular rabbi
              to call. Judaism 1 lowers the barrier to a first conversation.
            </li>
            <li>
              <strong className="text-stone-800">Timing:</strong> Important questions arrive in
              ordinary time, not on the synagogue calendar.
            </li>
            <li>
              <strong className="text-stone-800">Technology:</strong> Private video makes pastoral
              care possible across distance, without replacing in-person community.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">This may speak to you if...</h2>
          <ul className="mt-4 space-y-3 text-stone-600">
            <li>
              You are navigating a life transition and want counsel rooted in Jewish wisdom, not
              generic self-help.
            </li>
            <li>
              You are reconnecting with Judaism after years away and want a patient, knowledgeable
              guide rather than a classroom.
            </li>
            <li>
              You have a rabbi you admire, but prefer a private conversation on a sensitive topic
              by video, at a time you choose.
            </li>
            <li>
              You are raising children in a Jewish home and want practical, thoughtful support on
              education, ritual, and values.
            </li>
            <li>
              You simply want to learn: a parsha, a prayer, a practice. One person, one session,
              at your pace.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-900">What we are not</h2>
          <p className="mt-3 text-stone-600">
            Judaism 1 provides pastoral guidance, not psychotherapy or emergency care. Our guides do
            not diagnose mental illness or replace licensed clinicians. If you are in crisis, please
            call or text <strong>988</strong>.
          </p>
          <p className="mt-3 text-stone-600">
            Guides offer halachic orientation within their movement&apos;s norms. For binding
            rulings, they will direct you to your local rabbinic authority when appropriate. We
            complement your synagogue and community; we do not seek to replace them.
          </p>
        </section>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            href="/scholars"
            className="rounded-full bg-amber-800 px-6 py-3 text-sm font-medium text-white hover:bg-amber-900"
          >
            Browse guides
          </Link>
          <Link
            href="/beta"
            className="rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            Join the beta
          </Link>
          <Link
            href="/learnings"
            className="rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            Explore topics
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
