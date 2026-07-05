"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { GUIDE_TOPICS } from "@/lib/guide-topics";

export function FindGuideFlow() {
  const router = useRouter();

  function selectTopic(topicId: string) {
    router.push(`/scholars?topic=${encodeURIComponent(topicId)}`);
  }

  return (
    <div>
      <p className="text-lg font-medium text-stone-900">
        What would you like guidance on?
      </p>
      <p className="mt-1 text-sm text-stone-600">
        Choose one topic to see recommended guides. You can filter results on the next page.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {GUIDE_TOPICS.map((topic) => (
          <button
            key={topic.id}
            type="button"
            onClick={() => selectTopic(topic.id)}
            className="rounded-xl border border-stone-200 bg-white px-4 py-4 text-left text-sm font-medium text-stone-800 transition hover:border-amber-300 hover:bg-amber-50"
          >
            {topic.label}
          </button>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-stone-600">
        Prefer to browse everyone?{" "}
        <Link href="/scholars" className="font-medium text-amber-800 underline">
          Browse all guides
        </Link>
      </p>
    </div>
  );
}
