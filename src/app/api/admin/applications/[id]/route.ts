import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { action } = await request.json();

  const application = await prisma.providerApplication.findUnique({ where: { id } });
  if (!application) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (action === "reject") {
    await prisma.providerApplication.update({
      where: { id },
      data: { status: "REJECTED", adminNotes: "Rejected by admin" },
    });
    return NextResponse.json({ ok: true });
  }

  if (action === "approve") {
    const passwordHash = await bcrypt.hash("changeme123", 10);
    const slug = slugify(application.fullName);

    const user = await prisma.user.create({
      data: {
        email: application.email,
        name: application.fullName,
        passwordHash,
        role: "PROVIDER",
        timezone: application.timezone,
      },
    });

    const provider = await prisma.provider.create({
      data: {
        userId: user.id,
        slug,
        title: application.tier === "SCHOLAR" ? "Torah Scholar" : application.tier === "SPECIALIST" ? "Pastoral Specialist" : "Rabbi",
        bio: application.bio,
        denomination: application.denomination,
        ordinationBody: application.ordinationBody,
        tier: application.tier,
        status: "APPROVED",
        gender: "NON_BINARY",
        languages: application.languages,
        specialties: application.specialties,
        timezone: application.timezone,
        featured: false,
        sessionTypes: {
          create: [
            {
              name: "Standard Session",
              durationMin: 45,
              priceCents: application.proposedRate,
            },
          ],
        },
        availability: {
          create: [
            { dayOfWeek: 2, startTime: "18:00", endTime: "21:00" },
            { dayOfWeek: 4, startTime: "18:00", endTime: "21:00" },
          ],
        },
      },
    });

    await prisma.providerApplication.update({
      where: { id },
      data: {
        status: "APPROVED",
        providerId: provider.id,
        adminNotes: "Approved and profile created",
      },
    });

    return NextResponse.json({ ok: true, providerId: provider.id });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
