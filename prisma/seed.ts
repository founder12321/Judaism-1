import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const url = process.env.DATABASE_URL;
if (!url?.startsWith("postgres")) {
  throw new Error("DATABASE_URL must be PostgreSQL to run seed. Use Supabase connection string.");
}

const pool = new Pool({ connectionString: url });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const defaultPassword = "demo1234";

const foundingProviders = [
  {
    email: "rachel.gold@example.com",
    name: "Rabbi Rachel Gold",
    slug: "rachel-gold",
    title: "Rabbi",
    denomination: "REFORM",
    tier: "RABBI",
    gender: "FEMALE",
    ordinationBody: "Hebrew Union College",
    languages: "English, Hebrew",
    specialties: "Marriage & engagement, Interfaith families, Spiritual direction, Grief & loss",
    bio: "Rabbi Rachel has served Reform congregations for 12 years. She specializes in interfaith families and helping disconnected Jews find a path back to meaningful practice.",
    timezone: "America/New_York",
    featured: true,
    sessions: [
      { name: "Intro Session", durationMin: 30, priceCents: 7500 },
      { name: "Standard Session", durationMin: 45, priceCents: 10000 },
      { name: "Deep Dive", durationMin: 60, priceCents: 13500 },
    ],
  },
  {
    email: "david.stern@example.com",
    name: "Rabbi David Stern",
    slug: "david-stern",
    title: "Rabbi",
    denomination: "CONSERVATIVE",
    tier: "RABBI",
    gender: "MALE",
    ordinationBody: "Jewish Theological Seminary",
    languages: "English, Hebrew",
    specialties: "Parenting & Jewish home, Jewish practice, Career & work-life, Text study & learning",
    bio: "Conservative rabbi and educator with 15 years of pastoral experience. David helps families build Jewish homes and navigate life transitions with halachic sensitivity.",
    timezone: "America/Chicago",
    featured: true,
    sessions: [
      { name: "Standard Session", durationMin: 45, priceCents: 9500 },
      { name: "Deep Dive", durationMin: 60, priceCents: 12500 },
    ],
  },
  {
    email: "sarah.weiss@example.com",
    name: "Rabbi Sarah Weiss",
    slug: "sarah-weiss",
    title: "Rabbi",
    denomination: "CONSERVATIVE",
    tier: "RABBI",
    gender: "FEMALE",
    ordinationBody: "Jewish Theological Seminary",
    languages: "English",
    specialties: "Conversion & identity, Jewish practice, Marriage & engagement, Antisemitism support",
    bio: "Rabbi Sarah guides converts and Jews-by-choice through every stage of Jewish life. Warm, practical, and deeply knowledgeable about Conservative practice.",
    timezone: "America/Los_Angeles",
    featured: true,
    sessions: [
      { name: "Intro Session", durationMin: 30, priceCents: 8000 },
      { name: "Standard Session", durationMin: 45, priceCents: 11000 },
    ],
  },
  {
    email: "yaakov.levin@example.com",
    name: "Rabbi Yaakov Levin",
    slug: "yaakov-levin",
    title: "Rabbi",
    denomination: "ORTHODOX",
    tier: "RABBI",
    gender: "MALE",
    ordinationBody: "Yeshiva University",
    languages: "English, Hebrew",
    specialties: "Jewish practice, Marriage & engagement, Text study & learning, Career & work-life",
    bio: "Modern Orthodox rabbi offering thoughtful guidance on halacha, family life, and spiritual growth. Clear about movement norms; warm and non-judgmental.",
    timezone: "America/New_York",
    featured: true,
    sessions: [
      { name: "Standard Session", durationMin: 45, priceCents: 9000 },
      { name: "Deep Dive", durationMin: 60, priceCents: 12000 },
    ],
  },
  {
    email: "miriam.cohen@example.com",
    name: "Rabbi Miriam Cohen",
    slug: "miriam-cohen",
    title: "Rabbi",
    denomination: "RECONSTRUCTIONIST",
    tier: "RABBI",
    gender: "FEMALE",
    ordinationBody: "Reconstructionist Rabbinical College",
    languages: "English",
    specialties: "Spiritual direction, Identity & community, Grief & loss, Interfaith families",
    bio: "Reconstructionist rabbi and spiritual director. Miriam helps seekers explore Jewish identity, meaning, and practice without prescriptive answers.",
    timezone: "America/New_York",
    featured: false,
    sessions: [
      { name: "Standard Session", durationMin: 45, priceCents: 8500 },
      { name: "Deep Dive", durationMin: 60, priceCents: 11500 },
    ],
  },
  {
    email: "benjamin.rosen@example.com",
    name: "Rabbi Benjamin Rosen",
    slug: "benjamin-rosen",
    title: "Rabbi",
    denomination: "REFORM",
    tier: "RABBI",
    gender: "MALE",
    ordinationBody: "Hebrew Union College",
    languages: "English",
    specialties: "Career & work-life, Parenting & Jewish home, Antisemitism support, Spiritual direction",
    bio: "Reform rabbi who spent a decade in campus Hillel work. Benjamin connects with young professionals navigating career, identity, and antisemitism in the workplace.",
    timezone: "America/Denver",
    featured: false,
    sessions: [
      { name: "Intro Session", durationMin: 30, priceCents: 7000 },
      { name: "Standard Session", durationMin: 45, priceCents: 9500 },
    ],
  },
  {
    email: "leah.friedman@example.com",
    name: "Dr. Leah Friedman",
    slug: "leah-friedman",
    title: "Torah Scholar",
    denomination: "PLURALISTIC",
    tier: "SCHOLAR",
    gender: "FEMALE",
    ordinationBody: "Jewish Theological Seminary (Doctorate)",
    languages: "English, Hebrew",
    specialties: "Text study & learning, Jewish practice, Conversion & identity",
    bio: "Doctorate in Jewish Studies with 20 years teaching experience. Leah offers deep text study and clear explanations of Jewish concepts for learners at any level.",
    timezone: "America/New_York",
    featured: false,
    sessions: [
      { name: "Chavruta Study", durationMin: 45, priceCents: 7500 },
      { name: "Extended Study", durationMin: 60, priceCents: 10000 },
    ],
  },
  {
    email: "aaron.kaplan@example.com",
    name: "Rabbi Aaron Kaplan",
    slug: "aaron-kaplan",
    title: "Rabbi",
    denomination: "RENEWAL",
    tier: "RABBI",
    gender: "MALE",
    ordinationBody: "Aleph Ordination Program",
    languages: "English, Hebrew",
    specialties: "Spiritual direction, Grief & loss, Marriage & engagement, Identity & community",
    bio: "Jewish Renewal rabbi blending contemplative practice with pastoral care. Aaron supports seekers through grief, transitions, and spiritual awakening.",
    timezone: "America/Los_Angeles",
    featured: false,
    sessions: [
      { name: "Standard Session", durationMin: 45, priceCents: 9000 },
      { name: "Deep Dive", durationMin: 60, priceCents: 12000 },
    ],
  },
  {
    email: "hannah.brooks@example.com",
    name: "Rabbi Hannah Brooks",
    slug: "hannah-brooks",
    title: "Pastoral Specialist",
    denomination: "PLURALISTIC",
    tier: "SPECIALIST",
    gender: "FEMALE",
    ordinationBody: "Neshama Chaplaincy Certification",
    languages: "English",
    specialties: "Grief & loss, Spiritual direction, Antisemitism support, Parenting & Jewish home",
    bio: "Board-certified Jewish chaplain with hospital and hospice experience. Hannah provides compassionate pastoral support through illness, loss, and life's hardest moments.",
    timezone: "America/Chicago",
    featured: true,
    sessions: [
      { name: "Pastoral Session", durationMin: 45, priceCents: 8500 },
      { name: "Extended Pastoral", durationMin: 60, priceCents: 11000 },
    ],
  },
  {
    email: "eliyahu.mor@example.com",
    name: "Rabbi Eliyahu Mor",
    slug: "eliyahu-mor",
    title: "Rabbi",
    denomination: "ORTHODOX",
    tier: "RABBI",
    gender: "MALE",
    ordinationBody: "RIETS / RCA",
    languages: "English, Hebrew",
    specialties: "Jewish practice, Marriage & engagement, Parenting & Jewish home, Text study & learning",
    bio: "Community rabbi with semicha from RIETS. Eliyahu offers practical halachic orientation and warm pastoral guidance for Orthodox and traditionally-minded seekers.",
    timezone: "America/New_York",
    featured: false,
    sessions: [
      { name: "Standard Session", durationMin: 45, priceCents: 8500 },
      { name: "Deep Dive", durationMin: 60, priceCents: 11000 },
    ],
  },
];

const availabilityTemplate = [
  { dayOfWeek: 0, startTime: "10:00", endTime: "14:00" },
  { dayOfWeek: 2, startTime: "18:00", endTime: "21:00" },
  { dayOfWeek: 4, startTime: "18:00", endTime: "21:00" },
  { dayOfWeek: 6, startTime: "09:00", endTime: "12:00" },
];

async function main() {
  const passwordHash = await bcrypt.hash(defaultPassword, 10);

  await prisma.booking.deleteMany();
  await prisma.sessionType.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.providerApplication.deleteMany();
  await prisma.provider.deleteMany();
  await prisma.betaSignup.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      email: "admin@judaism1.com",
      name: "Platform Admin",
      passwordHash,
      role: "ADMIN",
    },
  });

  const demoUser = await prisma.user.create({
    data: {
      email: "demo@judaism1.com",
      name: "Demo User",
      passwordHash,
      role: "USER",
      timezone: "America/New_York",
    },
  });

  for (let i = 0; i < foundingProviders.length; i++) {
    const p = foundingProviders[i];
    const user = await prisma.user.create({
      data: {
        email: p.email,
        name: p.name,
        passwordHash,
        role: "PROVIDER",
        timezone: p.timezone,
        gender: p.gender as "MALE" | "FEMALE" | "NON_BINARY",
      },
    });

    const provider = await prisma.provider.create({
      data: {
        userId: user.id,
        slug: p.slug,
        title: p.title,
        bio: p.bio,
        denomination: p.denomination as
          | "ORTHODOX"
          | "CONSERVATIVE"
          | "REFORM"
          | "RECONSTRUCTIONIST"
          | "RENEWAL"
          | "PLURALISTIC",
        ordinationBody: p.ordinationBody,
        tier: p.tier as "RABBI" | "SCHOLAR" | "SPECIALIST",
        status: "APPROVED",
        gender: p.gender as "MALE" | "FEMALE" | "NON_BINARY",
        languages: p.languages,
        specialties: p.specialties,
        timezone: p.timezone,
        featured: p.featured,
        meetingLink:
          i % 2 === 0
            ? `https://zoom.us/j/judaism1-${p.slug}`
            : `https://meet.google.com/judaism1-${p.slug}`,
        rating: 4.7 + Math.random() * 0.3,
        reviewCount: Math.floor(Math.random() * 40) + 5,
        sessionTypes: {
          create: p.sessions,
        },
        availability: {
          create: availabilityTemplate,
        },
      },
    });

    await prisma.providerApplication.create({
      data: {
        providerId: provider.id,
        fullName: p.name,
        email: p.email,
        tier: p.tier as "RABBI" | "SCHOLAR" | "SPECIALIST",
        denomination: p.denomination as
          | "ORTHODOX"
          | "CONSERVATIVE"
          | "REFORM"
          | "RECONSTRUCTIONIST"
          | "RENEWAL"
          | "PLURALISTIC",
        ordinationBody: p.ordinationBody,
        credentials: p.ordinationBody ?? "Verified credentials on file",
        bio: p.bio,
        specialties: p.specialties,
        languages: p.languages,
        timezone: p.timezone,
        proposedRate: p.sessions[0].priceCents,
        status: "APPROVED",
        adminNotes: "Founding provider — manually vetted",
      },
    });
  }

  console.log("Seed complete.");
  console.log("If you were signed in, log out and sign in again — seed resets all users.");
  console.log(`Admin: admin@judaism1.com / ${defaultPassword}`);
  console.log(`Demo user: demo@judaism1.com / ${defaultPassword}`);
  console.log(`Providers: ${foundingProviders.length} approved across denominations`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
