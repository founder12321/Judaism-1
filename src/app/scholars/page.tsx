import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PRICING_LINE } from "@/lib/constants";
import { PageShell } from "@/components/ui";
import { ScholarBrowse } from "@/components/ScholarBrowse";
import Link from "next/link";

export default async function ScholarsPage({
  searchParams,
}: {
  searchParams: Promise<{ specialty?: string; topic?: string }>;
}) {
  const session = await auth();
  const { specialty, topic } = await searchParams;
  const user = session?.user?.id
    ? await prisma.user.findUnique({ where: { id: session.user.id } })
    : null;

  const providers = await prisma.provider.findMany({
    where: { status: "APPROVED" },
    include: {
      user: { select: { name: true } },
      sessionTypes: { select: { priceCents: true, durationMin: true } },
      availability: { select: { dayOfWeek: true, startTime: true } },
    },
    orderBy: [{ featured: "desc" }, { rating: "desc" }],
  });

  return (
    <PageShell
      title="Find your guide"
      subtitle={PRICING_LINE}
    >
      <p className="-mt-4 mb-6 text-sm text-stone-600">
        <Link href="/find" className="font-medium text-amber-800 underline">
          Match by topic
        </Link>
        {" · "}
        Browse all guides below. No account required to view profiles.
      </p>
      <ScholarBrowse
        providers={providers}
        userGender={user?.gender}
        initialSpecialty={specialty ?? ""}
        topicId={topic ?? ""}
      />
    </PageShell>
  );
}
