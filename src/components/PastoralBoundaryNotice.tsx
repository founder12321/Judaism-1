import Link from "next/link";
import { EMERGENCY_NOTICE } from "@/lib/constants";

export function PastoralBoundaryNotice({
  compact = false,
  showEmergency = true,
}: {
  compact?: boolean;
  showEmergency?: boolean;
}) {
  if (compact) {
    return (
      <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
        Judaism 1 provides Jewish pastoral guidance, learning, and spiritual support. It is not
        therapy, medical care, legal advice, emergency counseling, or crisis intervention.{" "}
        {showEmergency && (
          <>
            {EMERGENCY_NOTICE}{" "}
            <Link href="/legal/disclaimer" className="font-medium underline">
              Learn more
            </Link>
          </>
        )}
      </p>
    );
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
      <p className="font-medium">Pastoral guidance, not clinical care</p>
      <p className="mt-2">
        Judaism 1 provides Jewish pastoral guidance, learning, and spiritual support. It is not
        therapy, medical care, legal advice, emergency counseling, or crisis intervention.
      </p>
      {showEmergency && (
        <p className="mt-2">{EMERGENCY_NOTICE}</p>
      )}
      <p className="mt-2">
        <Link href="/legal/disclaimer" className="font-medium underline">
          Full session disclaimer
        </Link>
        {" · "}
        <Link href="/faq" className="font-medium underline">
          FAQ
        </Link>
      </p>
    </div>
  );
}
