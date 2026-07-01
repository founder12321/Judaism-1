"use client";

import Link from "next/link";
import { Badge, Card } from "@/components/ui";
import {
  denominationLabel,
  formatCents,
  parseList,
  tierLabel,
} from "@/lib/utils";

type ProviderCardData = {
  slug: string;
  title: string;
  bio: string;
  denomination: string;
  tier: string;
  gender: string;
  languages: string;
  specialties: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  sessionTypes: { priceCents: number; durationMin: number }[];
  user: { name: string };
};

export function ProviderCard({ provider }: { provider: ProviderCardData }) {
  const specialties = parseList(provider.specialties).slice(0, 3);
  const minPrice = Math.min(...provider.sessionTypes.map((s) => s.priceCents));
  const minDuration = provider.sessionTypes.find(
    (s) => s.priceCents === minPrice,
  )?.durationMin;

  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-stone-900">{provider.user.name}</p>
          <p className="text-sm text-stone-500">
            {provider.title} · {tierLabel(provider.tier)}
          </p>
        </div>
        {provider.featured && <Badge>Founding Guide</Badge>}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Badge>{denominationLabel(provider.denomination)}</Badge>
      </div>

      <p className="mt-4 line-clamp-3 flex-1 text-sm text-stone-600">{provider.bio}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {specialties.map((s) => (
          <span key={s} className="text-xs text-amber-800">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4">
        <div>
          <p className="text-sm font-medium text-stone-900">
            From {formatCents(minPrice)}
          </p>
          <p className="text-xs text-stone-500">
            {minDuration} min · ★ {provider.rating.toFixed(1)} ({provider.reviewCount})
          </p>
        </div>
        <Link
          href={`/scholars/${provider.slug}`}
          className="rounded-full bg-amber-800 px-4 py-2 text-sm font-medium text-white hover:bg-amber-900"
        >
          View profile
        </Link>
      </div>
    </Card>
  );
}
