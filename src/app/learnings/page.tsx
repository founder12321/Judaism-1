import Link from "next/link";
import { PageShell, Card } from "@/components/ui";

const learningTopics = [
  {
    title: "Shabbat",
    summary:
      "Candles, kiddush, rest. A guide can help you start with one practice that fits your home and schedule.",
    relatedSpecialty: "Jewish practice",
  },
  {
    title: "Kashrut",
    summary:
      "What is kosher, how to set up a kitchen, and how to navigate meals with family or colleagues who did not grow up with these norms.",
    relatedSpecialty: "Jewish practice",
  },
  {
    title: "Prayer & Siddur",
    summary:
      "Build a prayer habit in Hebrew, English, or both. You do not need fluency to begin.",
    relatedSpecialty: "Jewish practice",
  },
  {
    title: "Holidays & the Jewish calendar",
    summary:
      "What Rosh Hashanah, Pesach, Purim, and the rest require at home, and how to share them with people new to Jewish life.",
    relatedSpecialty: "Jewish practice",
  },
  {
    title: "Parsha & text study",
    summary:
      "Weekly Torah, Talmud, or a chavruta-style session. For people who want depth, not a sermon.",
    relatedSpecialty: "Text study & learning",
  },
  {
    title: "Jewish lifecycle",
    summary:
      "Brit milah, bar/bat mitzvah, wedding, mourning. The rituals matter, and so does knowing what you are meant to feel.",
    relatedSpecialty: "Marriage & engagement",
  },
  {
    title: "Marriage & relationships",
    summary:
      "Premarital conversations, conflict, building a Jewish home. Often most valuable before the wedding.",
    relatedSpecialty: "Marriage & engagement",
  },
  {
    title: "Parenting a Jewish home",
    summary:
      "Day school or public school, Hebrew names, bedtime Shema, raising children with Jewish values.",
    relatedSpecialty: "Parenting & Jewish home",
  },
  {
    title: "Grief & mourning",
    summary:
      "Shiva, kaddish, the first year. Pastoral support for loss. Not a substitute for grief therapy when that is needed.",
    relatedSpecialty: "Grief & loss",
  },
  {
    title: "Jewish identity",
    summary:
      "Disconnected, skeptical, returning, or unsure where you fit. Worth discussing with someone who has heard it before.",
    relatedSpecialty: "Spiritual direction",
  },
  {
    title: "Career & purpose",
    summary:
      "Ethics at work, ambition and balance, whether your career aligns with how you want to live as a Jew.",
    relatedSpecialty: "Career & work-life",
  },
  {
    title: "Antisemitism",
    summary:
      "Something happened at work or on campus and you need to process it with someone who will not minimize it.",
    relatedSpecialty: "Antisemitism support",
  },
];

export default function LearningsPage() {
  return (
    <PageShell
      title="Topics people book for"
      subtitle="A starting point, not a course catalog. The conversation with your guide is the point."
    >
      <div className="mb-8 rounded-xl border border-stone-200 bg-stone-50 p-5 text-sm text-stone-600">
        <p>
          Pick a topic, then{" "}
          <Link href="/scholars" className="font-medium text-amber-800 underline">
            find a guide
          </Link>{" "}
          who handles it. Most sessions are 45 minutes on video.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {learningTopics.map((topic) => (
          <Card key={topic.title} className="flex flex-col">
            <h2 className="text-lg font-semibold text-stone-900">{topic.title}</h2>
            <p className="mt-3 flex-1 text-sm text-stone-600">{topic.summary}</p>
            <Link
              href={`/scholars?specialty=${encodeURIComponent(topic.relatedSpecialty)}`}
              className="mt-4 text-sm font-medium text-amber-800 hover:text-amber-900"
            >
              Find a guide
            </Link>
          </Card>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
        <p className="font-medium text-amber-950">Don&apos;t see your question?</p>
        <p className="mt-2 text-sm text-amber-900">
          Book anyway. You will share what you want to discuss before the session.
        </p>
        <Link
          href="/scholars"
          className="mt-4 inline-block rounded-full bg-amber-800 px-6 py-3 text-sm font-medium text-white hover:bg-amber-900"
        >
          Browse guides
        </Link>
      </div>
    </PageShell>
  );
}
