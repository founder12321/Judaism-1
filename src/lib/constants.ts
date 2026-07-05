export const PLATFORM_FEE_PERCENT = 18;
export const GUIDE_PAYOUT_PERCENT = 100 - PLATFORM_FEE_PERCENT;
export const MIN_SESSION_PRICE_CENTS = 7500;

export const LEGAL_CONTACT_EMAIL = "support@judaism1.com";
export const LEGAL_ENTITY_NAME = "Judaism 1";
export const LEGAL_LAST_UPDATED = "July 5, 2026";

export const DENOMINATIONS = [
  { value: "ORTHODOX", label: "Orthodox" },
  { value: "CONSERVATIVE", label: "Conservative" },
  { value: "REFORM", label: "Reform" },
  { value: "RECONSTRUCTIONIST", label: "Reconstructionist" },
  { value: "RENEWAL", label: "Renewal" },
  { value: "PLURALISTIC", label: "Just Jewish / Pluralistic" },
] as const;

export const SPECIALTIES = [
  "Marriage & engagement",
  "Parenting & Jewish home",
  "Career & work-life",
  "Grief & loss",
  "Jewish practice",
  "Text study & learning",
  "Conversion & identity",
  "Interfaith families",
  "Antisemitism support",
  "Spiritual direction",
] as const;

export const BOOKING_CATEGORIES = [
  "Life & relationships",
  "Jewish practice & learning",
  "Identity & community",
] as const;

/** Crisis / emergency language — blocks booking and shows safety routing */
export const CRISIS_KEYWORDS = [
  "kill myself",
  "killing myself",
  "end my life",
  "ending my life",
  "suicide",
  "suicidal",
  "self-harm",
  "self harm",
  "want to die",
  "hurt myself",
  "harm myself",
  "going to hurt someone",
  "immediate danger",
  "in immediate danger",
  "may harm myself",
  "may harm someone",
];

export const TAGLINE = "Your rabbi, when you need one.";
export const HEBREW_TAGLINE = "עשה לך רב";
export const HERO_HEADLINE = "Talk privately with a vetted rabbi or Jewish scholar.";
export const HERO_SUBHEADLINE =
  "Book one-on-one Jewish guidance for life questions, learning, grief, family, conversion, marriage, Shabbat, antisemitism, and more. No synagogue membership required.";
export const CATEGORY = "Private pastoral guidance for Jews";
export const SITE_DESCRIPTION =
  "Book a vetted rabbi or Jewish scholar for a private video session. Pastoral guidance for life, learning, and identity. No synagogue membership required.";
export const TRUST_LINE = "Confidential. Vetted providers. Pastoral guidance, not therapy.";
export const PRICING_LINE =
  "Sessions start at $75. Each guide sets their own rate based on experience, session length, and availability.";
export const EMERGENCY_NOTICE =
  "If you are in immediate danger or experiencing a mental health emergency, contact local emergency services or a crisis hotline. Judaism 1 is not an emergency service.";
