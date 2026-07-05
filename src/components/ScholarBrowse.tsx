"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ProviderCard } from "@/components/ProviderCard";
import { DENOMINATIONS } from "@/lib/constants";
import { getGuideTopic, scoreProviderForTopic } from "@/lib/guide-topics";

type Provider = Parameters<typeof ProviderCard>[0]["provider"];

export function ScholarBrowse({
  providers,
  userGender,
  initialSpecialty = "",
  topicId = "",
}: {
  providers: Provider[];
  userGender?: string | null;
  initialSpecialty?: string;
  topicId?: string;
}) {
  const [denomination, setDenomination] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sameGenderOnly, setSameGenderOnly] = useState(false);

  const topic = getGuideTopic(topicId);

  const ranked = useMemo(() => {
    return [...providers]
      .map((p) => ({
        provider: p,
        score:
          scoreProviderForTopic(p.specialties, topicId) +
          (p.featured ? 2 : 0) +
          p.rating,
      }))
      .sort((a, b) => b.score - a.score);
  }, [providers, topicId]);

  const filtered = useMemo(() => {
    return ranked.filter(({ provider: p }) => {
      if (denomination && p.denomination !== denomination) return false;
      if (initialSpecialty && !p.specialties.toLowerCase().includes(initialSpecialty.toLowerCase())) {
        return false;
      }
      if (topic && topic.id !== "other" && topic.searchTerms.length > 0) {
        const lower = p.specialties.toLowerCase();
        const matchesTopic = topic.searchTerms.some((t) => lower.includes(t.toLowerCase()));
        if (!matchesTopic) return false;
      }
      if (maxPrice) {
        const min = Math.min(...p.sessionTypes.map((s) => s.priceCents));
        if (min > Number(maxPrice) * 100) return false;
      }
      if (sameGenderOnly && userGender && p.gender !== userGender) return false;
      return true;
    });
  }, [ranked, denomination, initialSpecialty, topic, maxPrice, sameGenderOnly, userGender]);

  return (
    <div>
      {topic && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          Showing guides for <strong>{topic.label}</strong>.{" "}
          <Link href="/scholars" className="font-medium underline">
            Clear topic
          </Link>
          {" · "}
          <Link href="/find" className="font-medium underline">
            Change topic
          </Link>
        </div>
      )}

      <div className="mb-8 grid gap-4 rounded-xl border border-stone-200 bg-stone-50 p-4 md:grid-cols-4">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-stone-700">Background</span>
          <select
            value={denomination}
            onChange={(e) => setDenomination(e.target.value)}
            className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2"
          >
            <option value="">All</option>
            {DENOMINATIONS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-stone-700">Max price</span>
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2"
          >
            <option value="">Any</option>
            <option value="100">Up to $100</option>
            <option value="125">Up to $125</option>
            <option value="150">Up to $150</option>
          </select>
        </label>

        <label className="flex items-end gap-2 text-sm md:col-span-2">
          <input
            type="checkbox"
            checked={sameGenderOnly}
            onChange={(e) => setSameGenderOnly(e.target.checked)}
            className="rounded border-stone-300"
          />
          <span className="pb-0.5 text-stone-700">Prefer same-gender guide (optional)</span>
        </label>
      </div>

      <p className="mb-4 text-sm text-stone-500">
        {filtered.length} guide{filtered.length !== 1 ? "s" : ""} available
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(({ provider }) => (
          <ProviderCard key={provider.slug} provider={provider} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
          <p>No guides match these filters.</p>
          <Link href="/scholars" className="mt-3 inline-block text-sm font-medium text-amber-800 underline">
            Browse all guides
          </Link>
        </div>
      )}
    </div>
  );
}
