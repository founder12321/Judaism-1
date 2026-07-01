import Stripe from "stripe";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PUBLISHABLE_KEY);
}

export async function createCheckoutSession(params: {
  bookingId: string;
  priceCents: number;
  providerStripeAccountId?: string | null;
  customerEmail: string;
  description: string;
  successUrl: string;
  cancelUrl: string;
}) {
  if (!stripe) {
    return { demo: true, url: params.successUrl };
  }

  const platformFee = Math.round(params.priceCents * 0.18);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: params.customerEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: params.description },
          unit_amount: params.priceCents,
        },
        quantity: 1,
      },
    ],
    payment_intent_data: params.providerStripeAccountId
      ? {
          application_fee_amount: platformFee,
          transfer_data: { destination: params.providerStripeAccountId },
        }
      : undefined,
    metadata: { bookingId: params.bookingId },
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
  });

  return { demo: false, url: session.url!, sessionId: session.id };
}

export async function createConnectOnboardingLink(accountId: string, returnUrl: string) {
  if (!stripe) return null;

  return stripe.accountLinks.create({
    account: accountId,
    refresh_url: returnUrl,
    return_url: returnUrl,
    type: "account_onboarding",
  });
}

export async function createConnectAccount(email: string) {
  if (!stripe) return null;

  return stripe.accounts.create({
    type: "express",
    email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    business_type: "individual",
  });
}
