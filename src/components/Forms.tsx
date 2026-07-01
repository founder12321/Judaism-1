"use client";

import { useState } from "react";
import { PageShell, Card } from "@/components/ui";
import { DENOMINATIONS, SPECIALTIES } from "@/lib/constants";

export function ProviderApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Submission failed");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card>
        <h2 className="font-medium text-stone-900">Application received</h2>
        <p className="mt-2 text-sm text-stone-600">
          Thank you for applying. We review credentials, run reference checks, and respond within 5-7 business days.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm">
            <span className="font-medium">Full name</span>
            <input name="fullName" required className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" />
          </label>
          <label className="text-sm">
            <span className="font-medium">Email</span>
            <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm">
            <span className="font-medium">Phone</span>
            <input name="phone" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" />
          </label>
          <label className="text-sm">
            <span className="font-medium">Tier</span>
            <select name="tier" required className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2">
              <option value="RABBI">Rabbi (smichah)</option>
              <option value="SCHOLAR">Torah Scholar</option>
              <option value="SPECIALIST">Pastoral Specialist / Chaplain</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm">
            <span className="font-medium">Denomination</span>
            <select name="denomination" required className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2">
              {DENOMINATIONS.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="font-medium">Ordination / credentials body</span>
            <input name="ordinationBody" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" />
          </label>
        </div>

        <label className="text-sm block">
          <span className="font-medium">Credentials summary</span>
          <textarea name="credentials" required rows={3} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" />
        </label>

        <label className="text-sm block">
          <span className="font-medium">Bio (for your profile)</span>
          <textarea name="bio" required rows={4} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" />
        </label>

        <label className="text-sm block">
          <span className="font-medium">Specialties</span>
          <select name="specialties" required multiple className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" size={5}>
            {SPECIALTIES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <span className="text-xs text-stone-500">Hold Cmd/Ctrl to select multiple</span>
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm">
            <span className="font-medium">Languages</span>
            <input name="languages" defaultValue="English" required className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" />
          </label>
          <label className="text-sm">
            <span className="font-medium">Proposed rate (45 min, USD)</span>
            <input name="proposedRate" type="number" min={50} max={300} defaultValue={95} required className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" />
          </label>
        </div>

        <label className="text-sm block">
          <span className="font-medium">References (names & contact)</span>
          <textarea name="references" rows={2} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-amber-800 px-6 py-3 text-sm font-medium text-white hover:bg-amber-900 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit application"}
        </button>
      </form>
    </Card>
  );
}

export function BetaSignupForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/beta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form.entries())),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Signup failed");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card>
        <h2 className="font-medium">You&apos;re on the list!</h2>
        <p className="mt-2 text-sm text-stone-600">
          We&apos;ll invite you to the beta when founding guides are ready. First sessions may be discounted.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="text-sm block">
          <span className="font-medium">Email</span>
          <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" />
        </label>
        <label className="text-sm block">
          <span className="font-medium">Name (optional)</span>
          <input name="name" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" />
        </label>
        <label className="text-sm block">
          <span className="font-medium">Which best describes you?</span>
          <select name="segment" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2">
            <option value="unaffiliated">No regular rabbi</option>
            <option value="affiliated">Synagogue member wanting more</option>
            <option value="convert">Convert / Jew-by-choice</option>
            <option value="interfaith">Interfaith family</option>
            <option value="other">Other</option>
          </select>
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="rounded-full bg-amber-800 px-6 py-3 text-sm font-medium text-white hover:bg-amber-900">
          Join waitlist
        </button>
      </form>
    </Card>
  );
}
