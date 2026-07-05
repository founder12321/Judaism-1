import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageShell } from "@/components/ui";
import { PastoralBoundaryNotice } from "@/components/PastoralBoundaryNotice";
import { getTopicPage, TOPIC_PAGES } from "@/lib/topic-pages";

export function generateStaticParams() {
  return TOPIC_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getTopicPage(slug);
  if (!page) return { title: "Topic not found" };
  return {
    title: `${page.h1} | Judaism 1`,
    description: page.metaDescription,
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getTopicPage(slug);
  if (!page) notFound();

  return (
    <PageShell title={page.h1} subtitle={page.metaDescription}>
      <div className="mx-auto max-w-3xl space-y-8">
        <PastoralBoundaryNotice compact />

        {page.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold text-stone-900">{section.title}</h2>
            <p className="mt-3 text-stone-600">{section.body}</p>
          </section>
        ))}

        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            href={`/scholars?topic=${page.topicId}`}
            className="rounded-full bg-amber-800 px-6 py-3 text-sm font-medium text-white hover:bg-amber-900"
          >
            Find a guide
          </Link>
          <Link
            href="/find"
            className="rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            Match by topic
          </Link>
        </div>

        {page.related.length > 0 && (
          <section className="border-t border-stone-200 pt-8">
            <h2 className="text-sm font-medium text-stone-900">Related topics</h2>
            <ul className="mt-3 space-y-2">
              {page.related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/topics/${r.slug}`} className="text-sm text-amber-800 underline">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </PageShell>
  );
}
