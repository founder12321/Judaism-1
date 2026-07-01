# Judaism 1 — v1 Product Decisions

**Status:** Locked for MVP build  
**Date:** June 2026

## Open Questions — Resolved

### 1. Operator vs. provider

**Decision:** Platform operator is separate from providers at launch.

- Judaism 1 is a marketplace brand, not a single-rabbi practice.
- Founding providers are independent contractors with their own profiles and rates.
- Operator role: vetting, admin approval, platform quality — not delivering sessions unless separately onboarded as a provider.

### 2. Geography

**Decision:** US-first, US time zones (ET, CT, MT, PT).

- All MVP scheduling assumes US timezone selection.
- Providers tag their primary timezone; availability shown in user's selected timezone.
- International expansion deferred until payment, legal, and provider density are proven.

**Implementation:** `User.timezone` and `Provider.timezone` default to `America/New_York`; browse filters include timezone-friendly labels.

### 3. Gender matching

**Decision:** Optional "prefer same-gender guide" filter — enabled in v1.

- Many users want same-gender guidance for marriage, intimacy, and family topics.
- Filter is optional, not default — avoids excluding users who don't care.
- Provider profiles display gender for transparency.

**Implementation:** Browse page filter `sameGenderOnly` + provider `gender` field.

### 4. Hebrew support

**Decision:** English-first MVP; Hebrew as a provider capability tag.

- All platform UI in English.
- Providers tag languages: `English`, `Hebrew`, or both.
- Users filter by language; sessions can be conducted in either language based on provider bio.

**Implementation:** `Provider.languages` array; filter on browse page.

## v1 Scope Lock


| In v1                                | Deferred               |
| ------------------------------------ | ---------------------- |
| Pay-per-session marketplace          | Subscription plans     |
| Browse + filter + book               | AI matching            |
| Stripe Connect payments              | In-app messaging       |
| Video via Daily.co or link-out       | Native mobile apps     |
| Provider application + admin vetting | Synagogue B2B portal   |
| Beta waitlist                        | Public marketing spend |


## Business Defaults

- Platform fee: **18%** (within 15–20% range)
- Suggested session bands: **$75–150** for 45–60 min
- Launch target: **8–12 approved providers**, **3+ denominations**
- Crisis protocol: intake flags self-harm → block booking, show 988 resources