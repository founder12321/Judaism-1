import { CRISIS_KEYWORDS } from "./constants";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export function parseList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function joinList(items: string[]): string {
  return items.join(", ");
}

export function detectCrisisLanguage(text: string): boolean {
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some((keyword) => lower.includes(keyword));
}

export function calculatePlatformFee(priceCents: number): number {
  return Math.round(priceCents * 0.18);
}

export function calculateProviderPayout(priceCents: number): number {
  return priceCents - calculatePlatformFee(priceCents);
}

export function denominationLabel(value: string): string {
  const labels: Record<string, string> = {
    ORTHODOX: "Orthodox",
    CONSERVATIVE: "Conservative",
    REFORM: "Reform",
    RECONSTRUCTIONIST: "Reconstructionist",
    RENEWAL: "Renewal",
    PLURALISTIC: "Pluralistic",
  };
  return labels[value] ?? value;
}

export function tierLabel(value: string): string {
  const labels: Record<string, string> = {
    RABBI: "Rabbi",
    SCHOLAR: "Torah Scholar",
    SPECIALIST: "Pastoral Specialist",
  };
  return labels[value] ?? value;
}

export function genderLabel(value: string): string {
  const labels: Record<string, string> = {
    MALE: "Male",
    FEMALE: "Female",
    NON_BINARY: "Non-binary",
  };
  return labels[value] ?? value;
}

export function formatTimezoneLabel(timezone: string): string {
  try {
    const short = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "short",
    })
      .formatToParts(new Date())
      .find((p) => p.type === "timeZoneName")?.value;

    const friendly = timezone.replace(/_/g, " ").replace("/", " / ");
    return short ? `${friendly} (${short})` : friendly;
  } catch {
    return timezone.replace(/_/g, " ");
  }
}

export function generateQuarterHourTimes(): string[] {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (const minute of [0, 15, 30, 45]) {
      times.push(
        `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
      );
    }
  }
  return times;
}

export function formatTime12Hour(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

export function combineDateAndTime(date: string, time: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute);
}

export function formatInTimezone(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}
