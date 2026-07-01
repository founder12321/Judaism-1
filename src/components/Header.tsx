"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { HEBREW_TAGLINE, TAGLINE } from "@/lib/constants";

const navLinks = [
  { href: "/scholars", label: "Find a Guide" },
  { href: "/about", label: "About" },
  { href: "/learnings", label: "Topics" },
  { href: "/apply", label: "Become a Guide" },
  { href: "/beta", label: "Beta" },
];

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="group flex flex-col">
          <span className="text-xl font-semibold tracking-tight text-stone-900">
            Judaism <span className="text-amber-700">1</span>
          </span>
          <span className="text-xs text-stone-500">{TAGLINE}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition ${
                pathname === link.href
                  ? "font-medium text-amber-800"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-stone-600 hover:text-stone-900"
              >
                Dashboard
              </Link>
              {session.user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="text-sm text-stone-600 hover:text-stone-900"
                >
                  Admin
                </Link>
              )}
              {session.user.role === "PROVIDER" && (
                <Link
                  href="/provider"
                  className="text-sm text-stone-600 hover:text-stone-900"
                >
                  Provider
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/signup" className="text-sm text-stone-600 hover:text-stone-900">
                Sign up
              </Link>
              <Link href="/login" className="text-sm text-stone-600 hover:text-stone-900">
                Sign in
              </Link>
              <Link
                href="/scholars"
                className="rounded-full bg-amber-800 px-4 py-2 text-sm font-medium text-white hover:bg-amber-900"
              >
                Find a Guide
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="border-t border-stone-100 bg-stone-50 px-4 py-1 text-center text-xs text-stone-500">
        {HEBREW_TAGLINE} · Avot 1:6
      </div>
    </header>
  );
}
