"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { PageShell, Card } from "@/components/ui";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm">
          <span className="font-medium">Email</span>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
            placeholder="demo@judaism1.com"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium">Password</span>
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
            placeholder="demo1234"
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-full bg-amber-800 py-3 text-sm font-medium text-white hover:bg-amber-900"
        >
          Sign in
        </button>
      </form>
      <p className="mt-4 text-center text-xs text-stone-500">
        Demo: demo@judaism1.com / demo1234 · Admin: admin@judaism1.com / demo1234
      </p>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <PageShell title="Sign in" subtitle="Access your sessions and bookings.">
      <div className="mx-auto max-w-md">
        <Suspense>
          <LoginForm />
        </Suspense>
        <p className="mt-4 text-center text-sm text-stone-500">
          <Link href="/beta" className="underline">Join the beta waitlist</Link>
        </p>
      </div>
    </PageShell>
  );
}
