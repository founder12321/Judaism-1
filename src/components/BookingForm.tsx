"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BOOKING_CATEGORIES } from "@/lib/constants";
import { DisclaimerBanner } from "@/components/ui";
import {
  combineDateAndTime,
  formatCents,
  formatInTimezone,
  formatTime12Hour,
  formatTimezoneLabel,
  generateQuarterHourTimes,
} from "@/lib/utils";

type SessionType = {
  id: string;
  name: string;
  durationMin: number;
  priceCents: number;
};

export function BookingForm({
  providerSlug,
  providerName,
  providerTimezone,
  sessionTypes,
}: {
  providerSlug: string;
  providerName: string;
  providerTimezone: string;
  sessionTypes: SessionType[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [crisisBlocked, setCrisisBlocked] = useState(false);
  const [userTimezone, setUserTimezone] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("09:00");

  const timeSlots = useMemo(() => generateQuarterHourTimes(), []);
  const singleSessionType = sessionTypes.length === 1;

  useEffect(() => {
    setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const providerPreview = useMemo(() => {
    if (!selectedDate || !selectedTime) return null;
    const when = combineDateAndTime(selectedDate, selectedTime);
    if (Number.isNaN(when.getTime())) return null;
    return formatInTimezone(when, providerTimezone);
  }, [selectedDate, selectedTime, providerTimezone]);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().slice(0, 10);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setCrisisBlocked(false);

    const form = new FormData(e.currentTarget);
    const scheduledAt = combineDateAndTime(selectedDate, selectedTime).toISOString();

    const payload = {
      ...Object.fromEntries(form.entries()),
      scheduledAt,
      userTimezone: userTimezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
      category: BOOKING_CATEGORIES[0],
    };

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let data: { crisisBlocked?: boolean; error?: string; checkoutUrl?: string; bookingId?: string };
    try {
      data = await res.json();
    } catch {
      setLoading(false);
      setError("Something went wrong. Try signing out and back in, then book again.");
      return;
    }

    setLoading(false);

    if (data.crisisBlocked) {
      setCrisisBlocked(true);
      return;
    }

    if (!res.ok) {
      setError(data.error ?? "Something went wrong");
      return;
    }

    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
      return;
    }

    router.push(`/dashboard/bookings/${data.bookingId}?confirmed=1`);
  }

  if (crisisBlocked) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-950">
        <h2 className="font-medium">We&apos;re concerned about your safety</h2>
        <p className="mt-2 text-sm">
          Judaism 1 provides pastoral guidance, not emergency support. If you or someone you know is in crisis:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          <li>Call or text <strong>988</strong> (Suicide & Crisis Lifeline)</li>
          <li>Text HOME to <strong>741741</strong> (Crisis Text Line)</li>
          <li>Call <strong>911</strong> if you are in immediate danger</li>
        </ul>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="providerSlug" value={providerSlug} />

      <DisclaimerBanner compact />

      {singleSessionType ? (
        <input type="hidden" name="sessionTypeId" value={sessionTypes[0].id} />
      ) : (
        <label className="block text-sm">
          <span className="font-medium text-stone-700">Session type</span>
          <select
            name="sessionTypeId"
            required
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
            defaultValue={sessionTypes[0]?.id}
          >
            {sessionTypes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} · {s.durationMin} min · {formatCents(s.priceCents)}
              </option>
            ))}
          </select>
        </label>
      )}

      {singleSessionType && (
        <p className="text-sm text-stone-600">
          {sessionTypes[0].name} · {sessionTypes[0].durationMin} min ·{" "}
          {formatCents(sessionTypes[0].priceCents)}
        </p>
      )}

      <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-4">
        <div>
          <p className="text-sm font-medium text-stone-900">Choose a time</p>
          <p className="mt-1 text-xs text-stone-500">
            Times are in your local timezone. After booking, your guide&apos;s Zoom or Google Meet
            link will appear on your dashboard.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-stone-700">Date</span>
            <input
              type="date"
              required
              min={minDate}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2"
            />
          </label>

          <label className="block text-sm">
            <span className="font-medium text-stone-700">Time</span>
            <select
              required
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2"
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {formatTime12Hour(slot)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="space-y-2 text-xs text-stone-600">
          <p>
            <span className="font-medium text-stone-800">Your timezone:</span>{" "}
            {userTimezone ? formatTimezoneLabel(userTimezone) : "Detecting..."}
          </p>
          <p>
            <span className="font-medium text-stone-800">{providerName}&apos;s timezone:</span>{" "}
            {formatTimezoneLabel(providerTimezone)}
          </p>
          {providerPreview && (
            <p className="rounded-lg bg-white px-3 py-2 text-stone-700">
              For {providerName}, this session is{" "}
              <span className="font-medium">{providerPreview}</span>
            </p>
          )}
        </div>
      </div>

      <label className="block text-sm">
        <span className="font-medium text-stone-700">
          What would you like to discuss? <span className="font-normal text-stone-500">(optional)</span>
        </span>
        <p className="mt-1 text-xs text-stone-500">
          Share as much or as little as you like. You can also save it for the session itself.
        </p>
        <textarea
          name="topic"
          rows={3}
          placeholder="e.g. guidance on engagement, starting to keep Shabbat, a question about grief..."
          className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-2"
        />
      </label>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="disclaimerAccepted" value="true" required className="mt-1" />
        <span>
          I understand this is pastoral guidance, not psychotherapy or emergency care. I will contact 988 or 911 if I am in crisis.
        </span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-amber-800 py-3 text-sm font-medium text-white hover:bg-amber-900 disabled:opacity-50"
      >
        {loading ? "Processing..." : `Continue to payment`}
      </button>
    </form>
  );
}
