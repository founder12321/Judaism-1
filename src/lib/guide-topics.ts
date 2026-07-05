/** Topic options for the Find a Guide flow — maps to specialty search terms */
export const GUIDE_TOPICS = [
  {
    id: "life-advice",
    label: "Life advice",
    searchTerms: ["Spiritual direction", "Career & work-life"],
  },
  {
    id: "jewish-learning",
    label: "Jewish learning",
    searchTerms: ["Jewish practice", "Text study & learning"],
  },
  {
    id: "grief",
    label: "Grief/mourning",
    searchTerms: ["Grief & loss"],
  },
  {
    id: "marriage",
    label: "Marriage/relationships",
    searchTerms: ["Marriage & engagement"],
  },
  {
    id: "interfaith",
    label: "Interfaith family",
    searchTerms: ["Interfaith families"],
  },
  {
    id: "conversion",
    label: "Conversion",
    searchTerms: ["Conversion & identity"],
  },
  {
    id: "parenting",
    label: "Parenting",
    searchTerms: ["Parenting & Jewish home"],
  },
  {
    id: "shabbat",
    label: "Shabbat/holidays",
    searchTerms: ["Jewish practice"],
  },
  {
    id: "antisemitism",
    label: "Antisemitism",
    searchTerms: ["Antisemitism support"],
  },
  {
    id: "career",
    label: "Career/purpose",
    searchTerms: ["Career & work-life", "Spiritual direction"],
  },
  {
    id: "other",
    label: "Other",
    searchTerms: [],
  },
] as const;

export type GuideTopicId = (typeof GUIDE_TOPICS)[number]["id"];

export function getGuideTopic(id: string | undefined) {
  return GUIDE_TOPICS.find((t) => t.id === id);
}

export function scoreProviderForTopic(
  specialties: string,
  topicId: string | undefined,
): number {
  const topic = getGuideTopic(topicId ?? "");
  if (!topic || topic.id === "other") return 0;
  const lower = specialties.toLowerCase();
  let score = 0;
  for (const term of topic.searchTerms) {
    if (lower.includes(term.toLowerCase())) score += 10;
  }
  return score;
}
