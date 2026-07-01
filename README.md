# Judaism 1

Personal Jewish guidance, on your schedule. A marketplace connecting Jews 1-on-1 with vetted rabbis and Torah scholars for pastoral counsel and learning.

**Tagline:** Your rabbi, when you need one.

## Quick Start

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| User | demo@judaism1.com | demo1234 |
| Admin | admin@judaism1.com | demo1234 |
| Providers | *@example.com (see seed) | demo1234 |

## Features (MVP)

- **Browse scholars** — filter by denomination, specialty, language, same-gender preference
- **Provider profiles** — credentials, specialties, session types, pricing
- **Booking flow** — intake form, crisis detection, disclaimer, payment (Stripe or demo mode)
- **Video sessions** — each guide's personal Zoom or Google Meet link
- **User dashboard** — upcoming and past sessions
- **Provider dashboard** — bookings and earnings estimate
- **Admin dashboard** — approve applications, manage providers, view beta waitlist
- **Provider applications** — `/apply` with vetting pipeline
- **Beta waitlist** — `/beta` signup
- **Landing pages** — converts, interfaith families
- **Legal templates** — terms, privacy, disclaimer (draft — consult attorney)

## Tech Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- Prisma + SQLite (dev) — swap to PostgreSQL for production
- NextAuth (credentials)
- Stripe Connect (optional — demo mode without keys)

## Environment Variables

See `.env.example` for all variables.

## Project Structure

```
docs/
  validation/     # Interview guides for supply & demand
  decisions/      # v1 product decisions (locked)
  legal/          # Draft legal documents
  recruitment/    # Founding provider guide
  launch/         # Soft launch checklist
src/
  app/            # Pages and API routes
  components/     # UI components
  lib/            # Auth, DB, Stripe, video, utils
prisma/
  schema.prisma   # Data models
  seed.ts         # 10 founding demo providers
```

## v1 Decisions

- **Model:** Pay-per-session marketplace (18% platform fee)
- **Geography:** US time zones first
- **Language:** English UI; Hebrew as provider language tag
- **Gender:** Optional same-gender filter enabled
- **Not therapy:** Pastoral guidance only; crisis → 988

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run db:seed` | Seed demo providers |
| `npm run db:migrate` | Run migrations |

## Before Production

1. Follow [docs/launch/production-setup.md](docs/launch/production-setup.md) for Stripe, Supabase, Resend, and Vercel
2. Consult attorney on legal docs in `docs/legal/`
3. Providers add Zoom or Google Meet links + connect Stripe in their dashboard
4. **Do not** run `db:seed` in production

## License

Private — all rights reserved.
