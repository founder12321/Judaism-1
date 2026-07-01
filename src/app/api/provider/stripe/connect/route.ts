import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  createConnectAccount,
  createConnectOnboardingLink,
  stripe,
} from "@/lib/stripe";

export async function POST() {
  const session = await auth();
  if (!session?.user?.providerId || !stripe) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const provider = await prisma.provider.findUnique({
    where: { id: session.user.providerId },
    include: { user: true },
  });

  if (!provider) {
    return NextResponse.json({ error: "Provider not found" }, { status: 404 });
  }

  let accountId = provider.stripeAccountId;

  if (!accountId) {
    const account = await createConnectAccount(provider.user.email);
    if (!account) {
      return NextResponse.json({ error: "Could not create Stripe account" }, { status: 500 });
    }
    accountId = account.id;
    await prisma.provider.update({
      where: { id: provider.id },
      data: { stripeAccountId: accountId },
    });
  }

  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const link = await createConnectOnboardingLink(accountId, `${baseUrl}/provider`);

  if (!link?.url) {
    return NextResponse.json({ error: "Could not create onboarding link" }, { status: 500 });
  }

  return NextResponse.json({ url: link.url });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.providerId || !stripe) {
    return NextResponse.json({ connected: false });
  }

  const provider = await prisma.provider.findUnique({
    where: { id: session.user.providerId },
  });

  if (!provider?.stripeAccountId) {
    return NextResponse.json({ connected: false, hasAccount: false });
  }

  const account = await stripe.accounts.retrieve(provider.stripeAccountId);

  return NextResponse.json({
    connected: account.charges_enabled && account.payouts_enabled,
    hasAccount: true,
    detailsSubmitted: account.details_submitted,
  });
}
