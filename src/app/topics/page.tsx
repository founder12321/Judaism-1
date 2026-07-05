import Link from "next/link";
import { PageShell } from "@/components/ui";
import { TOPIC_PAGES } from "@/lib/topic-pages";

export default function TopicsIndexPage() {
  return (
    <PageShell
      title="Guidance topics"
      subtitle="Explore common reasons people book a session, then find a guide."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {TOPIC_PAGES.map((page) => (
          <Link
            key={page.slug}
            href={`/topics/${page.slug}`}
            className="rounded-xl border border-stone-200 bg-white p-5 hover:border-amber-300 hover:bg-amber-50"
          >
            <h2 className="font-medium text-stone-900">{page.h1}</h2>
            <p className="mt-2 text-sm text-stone-600">{page.metaDescription}</p>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/find"
          className="inline-block rounded-full bg-amber-800 px-6 py-3 text-sm font-medium text-white hover:bg-amber-900"
        >
          Find a guide
        </Link>
      </div>
    </PageShell>
  );
}
