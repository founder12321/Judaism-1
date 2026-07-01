export type MeetingLinkType = "zoom" | "google_meet" | "unknown";

const ZOOM_PATTERN =
  /^https?:\/\/([a-z0-9-]+\.)?zoom\.us\/(j|my|s)\/.+/i;
const MEET_PATTERN =
  /^https?:\/\/meet\.google\.com\/[a-z0-9-]+/i;

export function isValidMeetingLink(url: string): boolean {
  const trimmed = url.trim();
  return ZOOM_PATTERN.test(trimmed) || MEET_PATTERN.test(trimmed);
}

export function detectMeetingLinkType(url: string): MeetingLinkType {
  const trimmed = url.trim();
  if (ZOOM_PATTERN.test(trimmed)) return "zoom";
  if (MEET_PATTERN.test(trimmed)) return "google_meet";
  return "unknown";
}

export function meetingLinkLabel(type: MeetingLinkType): string {
  switch (type) {
    case "zoom":
      return "Zoom";
    case "google_meet":
      return "Google Meet";
    default:
      return "Video";
  }
}

export function normalizeMeetingLink(url: string): string {
  return url.trim();
}
