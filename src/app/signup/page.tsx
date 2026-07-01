"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageShell, Card } from "@/components/ui";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Could not create account");
      return;
    }

    router.push("/login?registered=1");
  }

  return (
    <PageShell title="Create an account" subtitle="Sign up to book sessions with a guide.">
      <div className="mx-auto max-w-md">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm">
              <span className="font-medium">Name</span>
              <input name="name" required className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" />
            </label>
            <label className="block text-sm">
              <span className="font-medium">Email</span>
              <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" />
            </label>
            <label className="block text-sm">
              <span className="font-medium">Password</span>
              <input name="password" type="password" required minLength={8} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" />
            </label>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="w-full rounded-full bg-amber-800 py-3 text-sm font-medium text-white hover:bg-amber-900">
              Create account
            </button>
          </form>
        </Card>
        <p className="mt-4 text-center text-sm text-stone-500">
          Already have an account? <Link href="/login" className="text-amber-800 underline">Sign in</Link>
        </p>
      </div>
    </PageShell>
  );
}
