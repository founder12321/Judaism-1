import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { sendBetaWelcomeEmail } from "@/lib/email";

const betaSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  segment: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = betaSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid signup" }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();

  await prisma.betaSignup.upsert({
    where: { email },
    create: {
      email,
      name: parsed.data.name,
      segment: parsed.data.segment,
      notes: parsed.data.notes,
    },
    update: {
      name: parsed.data.name ?? undefined,
      segment: parsed.data.segment ?? undefined,
    },
  });

  await sendBetaWelcomeEmail(email, parsed.data.name);

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const signups = await prisma.betaSignup.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(signups);
}
