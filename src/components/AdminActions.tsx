"use client";

import { useRouter } from "next/navigation";

export function AdminActions({
  applicationId,
  type,
}: {
  applicationId: string;
  type: "application" | "provider";
}) {
  const router = useRouter();

  async function handleAction(action: "approve" | "reject") {
    const endpoint =
      type === "application"
        ? `/api/admin/applications/${applicationId}`
        : `/api/admin/providers/${applicationId}`;

    await fetch(endpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    router.refresh();
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleAction("approve")}
        className="rounded-full bg-green-700 px-3 py-1 text-xs text-white hover:bg-green-800"
      >
        Approve
      </button>
      <button
        onClick={() => handleAction("reject")}
        className="rounded-full bg-stone-500 px-3 py-1 text-xs text-white hover:bg-stone-600"
      >
        Reject
      </button>
    </div>
  );
}
