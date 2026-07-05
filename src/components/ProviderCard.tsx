"use client";

import Link from "next/link";
import { Badge, Card } from "@/components/ui";
import {
  denominationLabel,
  formatCents,
  parseList,
  summarizeAvailability,
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
  availability?: { dayOfWeek: number; startTime: string }[];
  user: { name: string };
};

export function ProviderCard({ provider }: { provider: ProviderCardData }) {
  const specialties = parseList(provider.specialties).slice(0, 4);
  const minPrice = Math.min(...provider.sessionTypes.map((s) => s.priceCents));
  const minSession = provider.sessionTypes.find((s) => s.priceCents === minPrice);
  const availabilityLabel = summarizeAvailability(provider.availability ?? []);

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

      <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
        {specialties.map((s) => (
          <span key={s} className="text-xs text-amber-900">
            {s}
          </span>
        ))}
      </div>

      <p className="mt-4 line-clamp-2 flex-1 text-sm text-stone-600">{provider.bio}</p>

      <div className="mt-4 space-y-1 text-sm text-stone-600">
        <p>
          <span className="font-medium text-stone-800">{formatCents(minPrice)}</span>
          {minSession && (
            <span className="text-stone-500"> · {minSession.durationMin} min session</span>
          )}
        </p>
        <p className="text-xs text-stone-500">Next availability: {availabilityLabel}</p>
        <p className="text-xs text-stone-500">
          Includes private video session with your guide&apos;s meeting link after booking.
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2 border-t border-stone-100 pt-4">
        <p className="text-xs text-stone-500">
          ★ {provider.rating.toFixed(1)} ({provider.reviewCount})
        </p>
        <div className="flex gap-2">
          <Link
            href={`/scholars/${provider.slug}`}
            className="rounded-full border border-stone-300 px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50"
          >
            Profile
          </Link>
          <Link
            href={`/scholars/${provider.slug}/book`}
            className="rounded-full bg-amber-800 px-4 py-2 text-xs font-medium text-white hover:bg-amber-900"
          >
            Book session
          </Link>
        </div>
      </div>
    </Card>
  );
}
