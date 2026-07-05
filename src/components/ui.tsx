import { ReactNode } from "react";
import { PastoralBoundaryNotice } from "@/components/PastoralBoundaryNotice";

export function DisclaimerBanner({ compact = false }: { compact?: boolean }) {
  return <PastoralBoundaryNotice compact={compact} />;
}

export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-stone-600">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-700">
      {children}
    </span>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-stone-200 bg-white p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
