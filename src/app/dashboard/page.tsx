import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PageShell, Card, Badge } from "@/components/ui";
import { formatCents } from "@/lib/utils";
import { format } from "date-fns";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: {
      provider: { include: { user: { select: { name: true } } } },
      sessionType: true,
    },
    orderBy: { scheduledAt: "desc" },
  });

  const upcoming = bookings.filter(
    (b) => b.status === "CONFIRMED" && b.scheduledAt > new Date(),
  );
  const past = bookings.filter(
    (b) => b.status === "COMPLETED" || b.scheduledAt <= new Date(),
  );

  return (
    <PageShell title="Your dashboard" subtitle="Upcoming and past sessions.">
      <div className="mb-6">
        <Link
          href="/scholars"
          className="rounded-full bg-amber-800 px-4 py-2 text-sm font-medium text-white hover:bg-amber-900"
        >
          Book another session
        </Link>
      </div>

      <section>
        <h2 className="text-lg font-medium text-stone-900">Upcoming</h2>
        {upcoming.length === 0 ? (
          <p className="mt-3 text-sm text-stone-500">No upcoming sessions.</p>
        ) : (
          <div className="mt-4 grid gap-4">
            {upcoming.map((b) => (
              <Card key={b.id}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{b.provider.user.name}</p>
                    <p className="text-sm text-stone-500">
                      {format(b.scheduledAt, "PPP p")} · {b.sessionType.name}
                    </p>
                    <Badge>{b.status}</Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCents(b.sessionType.priceCents)}</p>
                    <Link
                      href={`/dashboard/bookings/${b.id}`}
                      className="mt-2 inline-block text-sm text-amber-800 underline"
                    >
                      View session
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium text-stone-900">Past</h2>
        {past.length === 0 ? (
          <p className="mt-3 text-sm text-stone-500">No past sessions yet.</p>
        ) : (
          <div className="mt-4 grid gap-4">
            {past.map((b) => (
              <Card key={b.id}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{b.provider.user.name}</p>
                    <p className="text-sm text-stone-500">
                      {format(b.scheduledAt, "PPP")} · {b.category}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/bookings/${b.id}`}
                    className="text-sm text-amber-800 underline"
                  >
                    Details
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
