"use client";

import { useEffect, useState } from "react";
import { GUIDE_PAYOUT_PERCENT } from "@/lib/constants";

export function ProviderStripeConnect() {
  const [status, setStatus] = useState<{
    connected: boolean;
    hasAccount: boolean;
    detailsSubmitted?: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/provider/stripe/connect")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => setStatus({ connected: false, hasAccount: false }));
  }, []);

  async function startOnboarding() {
    setLoading(true);
    const res = await fetch("/api/provider/stripe/connect", { method: "POST" });
    const data = await res.json();
    setLoading(false);
    if (data.url) window.location.href = data.url;
  }

  if (!status) return null;

  return (
    <div className="mt-4 rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm">
      <p className="font-medium text-stone-900">Stripe payouts</p>
      {status.connected ? (
        <p className="mt-2 text-stone-600">
          Your Stripe account is connected. You&apos;ll receive {GUIDE_PAYOUT_PERCENT}% of each session fee automatically.
        </p>
      ) : (
        <>
          <p className="mt-2 text-stone-600">
            Connect Stripe to receive payouts ({GUIDE_PAYOUT_PERCENT}% of session fees). Required before your first paid booking.
          </p>
          <button
            onClick={startOnboarding}
            disabled={loading}
            className="mt-3 rounded-full bg-amber-800 px-5 py-2 text-sm font-medium text-white hover:bg-amber-900 disabled:opacity-50"
          >
            {loading ? "Redirecting..." : status.hasAccount ? "Complete Stripe setup" : "Connect Stripe"}
          </button>
        </>
      )}
    </div>
  );
}
