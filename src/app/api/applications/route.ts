import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const applicationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  tier: z.enum(["RABBI", "SCHOLAR", "SPECIALIST"]),
  denomination: z.string(),
  ordinationBody: z.string().optional(),
  credentials: z.string().min(10),
  bio: z.string().min(50),
  specialties: z.union([z.string(), z.array(z.string())]),
  languages: z.string(),
  proposedRate: z.coerce.number().min(50).max(500),
  references: z.string().optional(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = applicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid application" }, { status: 400 });
  }

  const data = parsed.data;
  const specialties = Array.isArray(data.specialties)
    ? data.specialties.join(", ")
    : data.specialties;

  const existing = await prisma.providerApplication.findFirst({
    where: { email: data.email.toLowerCase(), status: "PENDING" },
  });

  if (existing) {
    return NextResponse.json({ error: "Application already pending" }, { status: 409 });
  }

  await prisma.providerApplication.create({
    data: {
      fullName: data.fullName,
      email: data.email.toLowerCase(),
      phone: data.phone,
      tier: data.tier,
      denomination: data.denomination as "ORTHODOX" | "CONSERVATIVE" | "REFORM" | "RECONSTRUCTIONIST" | "RENEWAL" | "PLURALISTIC",
      ordinationBody: data.ordinationBody,
      credentials: data.credentials,
      bio: data.bio,
      specialties,
      languages: data.languages,
      proposedRate: data.proposedRate * 100,
      references: data.references,
      status: "PENDING",
    },
  });

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const applications = await prisma.providerApplication.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(applications);
}
