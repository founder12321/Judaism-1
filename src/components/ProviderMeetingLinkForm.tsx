"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProviderMeetingLinkForm({
  currentLink,
}: {
  currentLink: string | null;
}) {
  const router = useRouter();
  const [link, setLink] = useState(currentLink ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const res = await fetch("/api/provider/meeting-link", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meetingLink: link }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Could not save link");
      return;
    }

    setSuccess(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block text-sm">
        <span className="font-medium text-stone-900">Your Zoom or Google Meet link</span>
        <p className="mt-1 text-xs text-stone-500">
          This link is shared with users when they book a session with you. Use a personal or
          recurring room link from Zoom or Google Meet.
        </p>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://zoom.us/j/... or https://meet.google.com/..."
          required
          className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
        />
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && (
        <p className="text-sm text-green-700">Meeting link saved.</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-amber-800 px-5 py-2 text-sm font-medium text-white hover:bg-amber-900 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save meeting link"}
      </button>
    </form>
  );
}
