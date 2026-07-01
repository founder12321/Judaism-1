import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PageShell, Card, Badge } from "@/components/ui";
import { AdminActions } from "@/components/AdminActions";
import { denominationLabel, formatCents } from "@/lib/utils";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  const [providers, pendingApps, betaSignups, bookings] = await Promise.all([
    prisma.provider.findMany({
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.providerApplication.findMany({
      where: { status: "PENDING", providerId: null },
      orderBy: { createdAt: "desc" },
    }),
    prisma.betaSignup.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.booking.count(),
  ]);

  const approvedCount = providers.filter((p) => p.status === "APPROVED").length;
  const denominations = new Set(providers.filter((p) => p.status === "APPROVED").map((p) => p.denomination));

  return (
    <PageShell title="Admin" subtitle="Manage providers, applications, and beta signups.">
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        {[
          { label: "Approved guides", value: approvedCount },
          { label: "Denominations", value: denominations.size },
          { label: "Pending applications", value: pendingApps.length },
          { label: "Total bookings", value: bookings },
        ].map((stat) => (
          <Card key={stat.label}>
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p className="text-sm text-stone-500">{stat.label}</p>
          </Card>
        ))}
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-medium">Pending applications</h2>
        {pendingApps.length === 0 ? (
          <p className="mt-2 text-sm text-stone-500">No pending applications.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {pendingApps.map((app) => (
              <Card key={app.id}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{app.fullName}</p>
                    <p className="text-sm text-stone-500">{app.email} · {app.tier}</p>
                    <p className="text-sm text-stone-500">{denominationLabel(app.denomination)} · {formatCents(app.proposedRate)}/session</p>
                    <p className="mt-2 line-clamp-2 text-sm text-stone-600">{app.bio}</p>
                  </div>
                  <AdminActions applicationId={app.id} type="application" />
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-medium">All providers</h2>
        <div className="mt-4 space-y-3">
          {providers.map((p) => (
            <Card key={p.id}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-medium">{p.user.name}</p>
                  <p className="text-sm text-stone-500">{denominationLabel(p.denomination)} · {p.slug}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge>{p.status}</Badge>
                  {p.status === "PENDING" && (
                    <AdminActions applicationId={p.id} type="provider" />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium">Beta waitlist ({betaSignups.length} shown)</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-stone-500">
                <th className="py-2">Email</th>
                <th className="py-2">Segment</th>
                <th className="py-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {betaSignups.map((s) => (
                <tr key={s.id} className="border-b border-stone-100">
                  <td className="py-2">{s.email}</td>
                  <td className="py-2">{s.segment ?? "n/a"}</td>
                  <td className="py-2">{s.createdAt.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageShell>
  );
}
