import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PageShell } from "@/components/ui";
import { ScholarBrowse } from "@/components/ScholarBrowse";

export default async function ScholarsPage({
  searchParams,
}: {
  searchParams: Promise<{ specialty?: string }>;
}) {
  const session = await auth();
  const { specialty } = await searchParams;
  const user = session?.user?.id
    ? await prisma.user.findUnique({ where: { id: session.user.id } })
    : null;

  const providers = await prisma.provider.findMany({
    where: { status: "APPROVED" },
    include: {
      user: { select: { name: true } },
      sessionTypes: { select: { priceCents: true, durationMin: true } },
    },
    orderBy: [{ featured: "desc" }, { rating: "desc" }],
  });

  return (
    <PageShell
      title="Find your guide"
      subtitle="Vetted rabbis and Torah scholars across denominations. Book a private video session on your schedule."
    >
      <ScholarBrowse
        providers={providers}
        userGender={user?.gender}
        initialSpecialty={specialty ?? ""}
      />
    </PageShell>
  );
}
