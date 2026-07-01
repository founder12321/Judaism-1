# Production Launch Guide

Step-by-step setup for Stripe, Supabase, Resend, and Vercel. Skip demo seed in production.

---

## Overview

| Service | Purpose | Cost to start |
|---------|---------|---------------|
| **Vercel** | Host the Next.js app | Free tier |
| **Supabase** | PostgreSQL database | Free tier |
| **Stripe** | Payments + Connect payouts to guides | 2.9% + 30¢ per charge |
| **Resend** | Booking confirmation emails | Free tier (100 emails/day) |
| **Domain** | e.g. judaism1.com | ~$12/year |

---

## 1. Supabase (Database)

### Create project

1. Go to [supabase.com](https://supabase.com) → **New project**
2. Choose a region close to your users (e.g. US East)
3. Save the database password somewhere safe

### Get connection strings

In Supabase → **Project Settings** → **Database** → **Connection string**:

| Variable | Connection type | Port |
|----------|-----------------|------|
| `DATABASE_URL` | **Transaction pooler** (Session mode) | 6543 |
| `DIRECT_URL` | **Direct connection** | 5432 |

Add `?pgbouncer=true` to the pooler URL if not present.

### Push schema to Supabase

From your project directory, set `DATABASE_URL` and `DIRECT_URL` in `.env`, then:

```bash
npm run db:push
```

For local development, use the same Supabase project (free tier works fine). SQLite is no longer supported.

**Do not run `npm run db:seed` in production** — that wipes data and creates fake rabbis.

### Optional: create admin user manually

After first deploy, create an admin via Supabase SQL editor or a one-time script. Or sign up at `/signup` and update role in Supabase:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'you@yourdomain.com';
```

---

## 2. Stripe (Payments)

### Create account

1. [dashboard.stripe.com](https://dashboard.stripe.com) → complete business verification
2. Start in **Test mode** until everything works, then switch to Live

### API keys

Developers → **API keys**:

- `STRIPE_SECRET_KEY` → Secret key
- `STRIPE_PUBLISHABLE_KEY` → Publishable key (for future client-side use)

Add both to Vercel env vars.

### Enable Stripe Connect

1. Connect → **Get started**
2. Choose **Express** accounts (simplest for marketplace guides)
3. Set platform name: **Judaism 1**
4. Platform fee: **18%** (configured in code)

Guides connect their own Stripe account from **Provider dashboard → Connect Stripe** after you onboard them.

### Webhook (required for paid bookings)

1. Developers → **Webhooks** → **Add endpoint**
2. URL: `https://your-domain.com/api/webhooks/stripe`
3. Events: `checkout.session.completed`
4. Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET` in Vercel

**Local testing:**

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Use the webhook secret from the CLI output locally.

### Test card

In test mode: `4242 4242 4242 4242`, any future expiry, any CVC.

---

## 3. Resend (Email)

### Create account

1. [resend.com](https://resend.com) → sign up
2. **Domains** → add your domain (e.g. `judaism1.com`)
3. Add the DNS records Resend provides (SPF, DKIM) at your domain registrar
4. Wait for verification (usually minutes)

### API key

API Keys → create → `RESEND_API_KEY`

### From address

Set in Vercel:

```
EMAIL_FROM=Judaism 1 <bookings@judaism1.com>
```

Must match your verified domain.

### What gets emailed

| Event | Recipients |
|-------|------------|
| Booking confirmed (after Stripe payment) | User + guide |
| Beta waitlist signup | User |

Emails include the guide's Zoom/Meet link and session details.

---

## 4. Auth

Generate a secret:

```bash
openssl rand -base64 32
```

Set:

```
AUTH_SECRET=<output>
NEXTAUTH_URL=https://your-domain.com
```

Users sign up at `/signup`. Guides are created by admin after `/apply` approval.

---

## 5. Vercel (Deploy)

### Connect repo

1. Push code to GitHub
2. [vercel.com](https://vercel.com) → **Import project**
3. Framework: Next.js (auto-detected)

### Environment variables

Add all variables from [`.env.example`](../.env.example) for **Production**:

- `DATABASE_URL`, `DIRECT_URL`
- `AUTH_SECRET`, `NEXTAUTH_URL`
- `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`, `EMAIL_FROM`

### Build settings

- **Build command:** `npm run build` (default)
- **Install command:** `npm install` (runs `prisma generate` via postinstall)

### After first deploy

1. Run `npx prisma db push` locally against production `DIRECT_URL`, or use Supabase SQL
2. Update Stripe webhook URL to your Vercel domain
3. Test a full booking flow in Stripe test mode

---

## 6. Domain

1. Buy domain (Namecheap, Google Domains, etc.)
2. Vercel → Project → **Settings** → **Domains** → add domain
3. Point DNS to Vercel (A/CNAME records shown in dashboard)
4. Update `NEXTAUTH_URL` and `EMAIL_FROM` to use the real domain
5. Re-verify domain in Resend if needed

---

## 7. Pre-launch checklist

### Infrastructure
- [ ] Supabase project live, schema pushed
- [ ] All Vercel env vars set for Production
- [ ] Stripe webhook receiving events (check Stripe dashboard → Webhooks → logs)
- [ ] Resend domain verified, test email sends
- [ ] Custom domain on Vercel with HTTPS

### Legal (before taking money)
- [ ] Attorney reviewed docs in `docs/legal/`
- [ ] Terms, Privacy, Disclaimer pages live at `/legal/*`
- [ ] Company name and contact email filled in legal docs

### Product
- [ ] `/signup` works for new users
- [ ] Test booking: browse → book → pay (Stripe test) → email received → dashboard shows Meet/Zoom link
- [ ] Provider can set meeting link at `/provider`
- [ ] Provider can connect Stripe at `/provider`
- [ ] Admin can approve applications at `/admin`
- [ ] Demo seed data **not** in production database

### Guides (your task)
- [ ] 8+ real guides onboarded with meeting links and Stripe connected
- [ ] Provider agreements signed
- [ ] Background checks completed

---

## 8. Going live

1. Switch Stripe from **Test mode** to **Live mode**
2. Replace test API keys in Vercel with live keys
3. Create new live webhook endpoint
4. Remove any `@example.com` demo providers from database
5. Soft launch per [soft-launch-checklist.md](./soft-launch-checklist.md)

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Booking stays PENDING after payment | Check Stripe webhook logs; verify `STRIPE_WEBHOOK_SECRET` |
| No confirmation email | Verify Resend domain; check `EMAIL_FROM` matches verified domain |
| Database connection error on Vercel | Use pooler URL (6543) for `DATABASE_URL`, not direct |
| Prisma migrate fails | Use `DIRECT_URL` (5432) for migrations, not pooler |
| Guide doesn't get paid | Guide must complete Stripe Connect onboarding |
| "Booking unavailable" | Guide hasn't added Zoom/Meet link in provider dashboard |

---

## Monthly cost estimate (early stage)

| Service | ~Cost |
|---------|-------|
| Vercel | $0 |
| Supabase | $0 (free tier) |
| Resend | $0 (under 100 emails/day) |
| Stripe | Per transaction only |
| Domain | ~$1/mo |

Total fixed cost at launch: **~domain only**, until you outgrow free tiers.
