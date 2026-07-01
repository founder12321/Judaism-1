# Soft Launch Checklist — Judaism 1 Beta

Target: **20–50 beta users** with **8–12 founding guides** before public marketing.

## Pre-Launch (Complete Before Invites)

### Supply

- 8+ providers approved in admin dashboard
- 3+ denominations represented
- Each provider has session types and availability configured
- Provider agreements signed (physical or e-sign)
- Boundary training completed for all founding guides

### Platform

- `npm run build` passes
- Database seeded or production DB migrated
- Auth working (sign in, role-based access)
- Browse → book → pay flow tested end-to-end
- Crisis keyword blocking tested on intake form
- Video room links generated for confirmed bookings
- Stripe Connect configured (or demo mode documented)

### Legal

- Attorney review of Terms, Privacy, Provider Agreement
- Session disclaimer visible on booking flow
- Crisis protocol (988) tested in UI

### Beta Infrastructure

- `/beta` waitlist collecting signups
- Admin can view beta waitlist
- Invite email template ready (see below)

## Launch Week

### Day 1–2: Invite Beta Users

- Export beta waitlist from admin (or `/api/beta`)
- Send invite to first 20 users (personalized email)
- Offer $20 off first session (promo code or manual)
- Share direct link: `[your-domain]/scholars`

### Day 3–5: Provider Activation

- Confirm each founding guide has availability
- Providers share their profile links
- Monitor first bookings in admin dashboard

### Day 6–7: Feedback Loop

- Post-session satisfaction survey (email or link)
- Collect 5+ user interviews from beta participants
- Fix critical bugs within 48 hours

## Beta Invite Email Template

> Subject: You're invited — Judaism 1 beta
>
> Hi [Name],
>
> You signed up for early access to Judaism 1. We're ready for you.
>
> Judaism 1 connects you 1-on-1 with vetted rabbis and Torah scholars for pastoral guidance — marriage, parenting, Jewish learning, and more. Not therapy; personal Jewish guidance on your schedule.
>
> **Your beta perk:** $20 off your first session with code BETA20.
>
> [Browse scholars →](https://your-domain.com/scholars)
>
> We'd love your feedback after your first session. Reply to this email anytime.
>
> — The Judaism 1 team

## Success Metrics (First 60 Days)


| Metric              | Target              |
| ------------------- | ------------------- |
| Approved providers  | 10+                 |
| Denominations       | 3+                  |
| Beta signups        | 20–50               |
| Paid sessions       | 50+                 |
| Avg session rating  | 4.5+                |
| Second-session rate | 30%+ within 90 days |
| Refund/dispute rate | <5%                 |


## Post-Beta

- Incorporate feedback into v1.1
- Begin SEO content ("talk to a rabbi online")
- Explore partnerships (Moishe House, Hillel alumni)
- Plan subscription tier if retention supports it