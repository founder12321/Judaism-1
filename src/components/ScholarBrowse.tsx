"use client";

import { useMemo, useState } from "react";
import { ProviderCard } from "@/components/ProviderCard";
import { DENOMINATIONS, SPECIALTIES } from "@/lib/constants";

type Provider = Parameters<typeof ProviderCard>[0]["provider"];

export function ScholarBrowse({
  providers,
  userGender,
  initialSpecialty = "",
}: {
  providers: Provider[];
  userGender?: string | null;
  initialSpecialty?: string;
}) {
  const [denomination, setDenomination] = useState("");
  const [specialty, setSpecialty] = useState(initialSpecialty);
  const [sameGenderOnly, setSameGenderOnly] = useState(false);

  const filtered = useMemo(() => {
    return providers.filter((p) => {
      if (denomination && p.denomination !== denomination) return false;
      if (specialty && !p.specialties.toLowerCase().includes(specialty.toLowerCase())) return false;
      if (sameGenderOnly && userGender && p.gender !== userGender) return false;
      return true;
    });
  }, [providers, denomination, specialty, sameGenderOnly, userGender]);

  return (
    <div>
      <div className="mb-8 grid gap-4 rounded-xl border border-stone-200 bg-stone-50 p-4 md:grid-cols-3">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-stone-700">Denomination</span>
          <select
            value={denomination}
            onChange={(e) => setDenomination(e.target.value)}
            className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2"
          >
            <option value="">All</option>
            {DENOMINATIONS.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-stone-700">Specialty</span>
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2"
          >
            <option value="">All</option>
            {SPECIALTIES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>

        <label className="flex items-end gap-2 text-sm">
          <input
            type="checkbox"
            checked={sameGenderOnly}
            onChange={(e) => setSameGenderOnly(e.target.checked)}
            className="rounded border-stone-300"
          />
          <span className="pb-2 text-stone-700">Prefer same-gender guide</span>
        </label>
      </div>

      <p className="mb-4 text-sm text-stone-500">
        {filtered.length} guide{filtered.length !== 1 ? "s" : ""} available
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((provider) => (
          <ProviderCard key={provider.slug} provider={provider} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="rounded-xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
          No guides match your filters. Try broadening your search.
        </p>
      )}
    </div>
  );
}
