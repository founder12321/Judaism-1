import Link from "next/link";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PageShell } from "@/components/ui";
import { BookingForm } from "@/components/BookingForm";

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect(`/login?callbackUrl=/scholars/${(await params).slug}/book`);
  }

  const { slug } = await params;

  const provider = await prisma.provider.findUnique({
    where: { slug, status: "APPROVED" },
    include: {
      user: { select: { name: true } },
      sessionTypes: { orderBy: { priceCents: "asc" } },
    },
  });

  if (!provider) notFound();

  if (!provider.meetingLink) {
    return (
      <PageShell title={`Book with ${provider.user.name}`}>
        <div className="mx-auto max-w-xl rounded-xl border border-stone-200 bg-stone-50 p-6 text-center text-sm text-stone-600">
          <p>This guide has not added a meeting link yet. Please check back soon or choose another guide.</p>
          <Link href="/scholars" className="mt-4 inline-block text-amber-800 underline">
            Browse other guides
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      title={`Book with ${provider.user.name}`}
      subtitle="Choose a time and confirm your booking. Your guide's Zoom or Google Meet link will appear on your dashboard after payment."
    >
      <div className="mx-auto max-w-xl">
        <BookingForm
          providerSlug={provider.slug}
          providerName={provider.user.name}
          providerTimezone={provider.timezone}
          sessionTypes={provider.sessionTypes}
        />
        <p className="mt-4 text-center text-sm text-stone-500">
          <Link href={`/scholars/${provider.slug}`} className="underline">
            Back to profile
          </Link>
        </p>
      </div>
    </PageShell>
  );
}
