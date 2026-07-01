import Link from "next/link";
import { CATEGORY, HERO_HEADLINE, TAGLINE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-lg font-semibold text-stone-900">Judaism 1</p>
          <p className="mt-2 max-w-md text-sm font-medium text-stone-800">{HERO_HEADLINE}</p>
          <p className="mt-2 max-w-md text-sm text-stone-600">
            {CATEGORY} {TAGLINE}
          </p>
          <p className="mt-4 text-xs text-stone-500">
            Pastoral guidance, not therapy. Crisis? Call or text 988.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-stone-900">Platform</p>
          <ul className="mt-3 space-y-2 text-sm text-stone-600">
            <li><Link href="/scholars" className="hover:text-stone-900">Find a Guide</Link></li>
            <li><Link href="/about" className="hover:text-stone-900">About</Link></li>
            <li><Link href="/learnings" className="hover:text-stone-900">Topics</Link></li>
            <li><Link href="/apply" className="hover:text-stone-900">Become a Guide</Link></li>
            <li><Link href="/beta" className="hover:text-stone-900">Beta</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-stone-900">Legal</p>
          <ul className="mt-3 space-y-2 text-sm text-stone-600">
            <li><Link href="/legal/terms" className="hover:text-stone-900">Terms of Service</Link></li>
            <li><Link href="/legal/privacy" className="hover:text-stone-900">Privacy Policy</Link></li>
            <li><Link href="/legal/disclaimer" className="hover:text-stone-900">Session Disclaimer</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-200 px-4 py-4 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} Judaism 1. If you are in crisis, call or text 988.
      </div>
    </footer>
  );
}
