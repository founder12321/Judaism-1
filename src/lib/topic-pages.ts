export type TopicPageContent = {
  slug: string;
  h1: string;
  metaDescription: string;
  topicId: string;
  sections: { title: string; body: string }[];
  related: { label: string; slug: string }[];
};

export const TOPIC_PAGES: TopicPageContent[] = [
  {
    slug: "talk-to-a-rabbi-online",
    h1: "Talk to a rabbi online",
    metaDescription:
      "Book a private video session with a vetted rabbi or Jewish scholar. Pastoral guidance without synagogue membership.",
    topicId: "life-advice",
    sections: [
      {
        title: "When this helps",
        body: "You want a private conversation with a rabbi or Jewish scholar but do not have one in your community, or you prefer video on your schedule.",
      },
      {
        title: "What you can discuss",
        body: "Life transitions, Jewish practice, family questions, identity, learning, grief, and more. Sessions are pastoral guidance, not therapy or emergency care.",
      },
      {
        title: "How Judaism 1 works",
        body: "Browse vetted guides by background and topic, book a time, and join via Zoom or Google Meet. No synagogue membership required.",
      },
    ],
    related: [
      { label: "Ask a rabbi privately", slug: "ask-a-rabbi-privately" },
      { label: "Jewish grief support", slug: "jewish-grief-support" },
    ],
  },
  {
    slug: "ask-a-rabbi-privately",
    h1: "Ask a rabbi privately",
    metaDescription:
      "Confidential one-on-one sessions with vetted rabbis and Jewish scholars for personal Jewish guidance.",
    topicId: "life-advice",
    sections: [
      {
        title: "Privacy matters",
        body: "Many questions feel personal. Judaism 1 connects you with a guide for a confidential video session, subject to legal and safety limits.",
      },
      {
        title: "Who this is for",
        body: "Jews who want thoughtful guidance without a public setting, including those between congregations or exploring their relationship to Jewish life.",
      },
      {
        title: "What to expect",
        body: "Choose a guide, book a session, and share only what you want before the meeting. Judaism 1 does not record sessions.",
      },
    ],
    related: [
      { label: "Talk to a rabbi online", slug: "talk-to-a-rabbi-online" },
      { label: "Conversion guidance", slug: "jewish-conversion-guidance" },
    ],
  },
  {
    slug: "jewish-grief-support",
    h1: "Jewish grief and mourning support",
    metaDescription:
      "Pastoral support for loss, shiva, kaddish, and mourning from vetted rabbis and guides.",
    topicId: "grief",
    sections: [
      {
        title: "Pastoral support for loss",
        body: "Grief raises practical and spiritual questions: mourning customs, kaddish, telling children, and finding your footing. A guide can walk with you through Jewish tradition and personal meaning.",
      },
      {
        title: "Not a substitute for therapy",
        body: "Pastoral grief support is not psychotherapy. If you are in crisis or need clinical mental health care, contact a licensed professional or crisis hotline.",
      },
      {
        title: "Book a session",
        body: "Find guides with experience in grief and mourning. Sessions are private video conversations on your schedule.",
      },
    ],
    related: [
      { label: "Jewish parenting guidance", slug: "jewish-parenting-guidance" },
      { label: "Talk to a rabbi online", slug: "talk-to-a-rabbi-online" },
    ],
  },
  {
    slug: "interfaith-relationship-guidance",
    h1: "Jewish guidance for interfaith relationships",
    metaDescription:
      "Private sessions on engagement, marriage, family, and Jewish home life in interfaith contexts.",
    topicId: "interfaith",
    sections: [
      {
        title: "Real questions, real stakes",
        body: "Interfaith relationships touch holidays, children, extended family, and identity. A knowledgeable guide can help you think through choices rooted in Jewish tradition.",
      },
      {
        title: "Denomination matters",
        body: "Different movements approach interfaith family life differently. Choose a guide whose background aligns with your values and questions.",
      },
      {
        title: "Start with one conversation",
        body: "You do not need every answer before you book. A focused session can clarify next steps.",
      },
    ],
    related: [
      { label: "Marriage and relationships", slug: "talk-to-a-rabbi-online" },
      { label: "Jewish parenting", slug: "jewish-parenting-guidance" },
    ],
  },
  {
    slug: "jewish-conversion-guidance",
    h1: "Jewish conversion guidance",
    metaDescription:
      "One-on-one guidance for conversion, identity, and Jewish belonging with vetted rabbis and scholars.",
    topicId: "conversion",
    sections: [
      {
        title: "For seekers and Jews-by-choice",
        body: "Conversion is a journey of learning, community, and commitment. Guides can help you understand paths within different movements and what questions to ask.",
      },
      {
        title: "Orientation, not a conversion program",
        body: "Judaism 1 offers pastoral guidance and learning sessions. Formal conversion is completed through a sponsoring rabbi and community, not through the platform alone.",
      },
      {
        title: "Find the right guide",
        body: "Filter by denomination and book a private session to discuss where you are and what you need.",
      },
    ],
    related: [
      { label: "Jewish learning", slug: "shabbat-holiday-guidance" },
      { label: "Ask a rabbi privately", slug: "ask-a-rabbi-privately" },
    ],
  },
  {
    slug: "jewish-parenting-guidance",
    h1: "Jewish parenting guidance",
    metaDescription:
      "Private sessions on raising children with Jewish values, ritual, education, and family life.",
    topicId: "parenting",
    sections: [
      {
        title: "Building a Jewish home",
        body: "Parents navigate day school choices, Shabbat with young children, Hebrew names, and honest conversations about faith. A guide offers practical, thoughtful support.",
      },
      {
        title: "For all kinds of families",
        body: "Single parents, interfaith homes, and newly observant families all bring different questions. Choose a guide whose experience fits your situation.",
      },
      {
        title: "Book when you need it",
        body: "One session can address a specific question or help you plan the year ahead.",
      },
    ],
    related: [
      { label: "Shabbat and holidays", slug: "shabbat-holiday-guidance" },
      { label: "Interfaith relationships", slug: "interfaith-relationship-guidance" },
    ],
  },
  {
    slug: "shabbat-holiday-guidance",
    h1: "Shabbat and holiday guidance",
    metaDescription:
      "Learn and practice Shabbat, holidays, and the Jewish calendar with a vetted guide.",
    topicId: "shabbat",
    sections: [
      {
        title: "Start where you are",
        body: "Whether you are lighting candles for the first time or deepening observance, a guide can meet you at your level without judgment.",
      },
      {
        title: "Calendar and home practice",
        body: "Sessions can cover Shabbat, Pesach, High Holidays, kashrut basics, and how to build sustainable practice at home.",
      },
      {
        title: "One-on-one learning",
        body: "Private video sessions let you ask questions you might not ask in a large class.",
      },
    ],
    related: [
      { label: "Jewish conversion guidance", slug: "jewish-conversion-guidance" },
      { label: "Jewish parenting", slug: "jewish-parenting-guidance" },
    ],
  },
  {
    slug: "antisemitism-support",
    h1: "Antisemitism support for students and professionals",
    metaDescription:
      "Process antisemitism at work, school, or online with a guide who understands Jewish experience.",
    topicId: "antisemitism",
    sections: [
      {
        title: "You should not have to minimize it",
        body: "Antisemitism at work, on campus, or in public life is disorienting and exhausting. A guide can help you process what happened and think through responses grounded in Jewish wisdom and practical reality.",
      },
      {
        title: "Pastoral, not legal",
        body: "Guides offer spiritual and pastoral support. For legal claims or workplace formal complaints, consult appropriate professionals.",
      },
      {
        title: "Confidential sessions",
        body: "Book a private video session with a guide experienced in this area.",
      },
    ],
    related: [
      { label: "Career and purpose", slug: "jewish-career-purpose-guidance" },
      { label: "Talk to a rabbi online", slug: "talk-to-a-rabbi-online" },
    ],
  },
  {
    slug: "jewish-career-purpose-guidance",
    h1: "Jewish career and purpose guidance",
    metaDescription:
      "Explore work, ambition, ethics, and purpose through a Jewish lens with a vetted guide.",
    topicId: "career",
    sections: [
      {
        title: "Work and meaning",
        body: "Career decisions intersect with family, ethics, Shabbat, and identity. A guide can help you think through tradeoffs without generic career coaching.",
      },
      {
        title: "For professionals and students",
        body: "Whether you are starting out, changing paths, or navigating workplace tension, one session can bring clarity.",
      },
      {
        title: "Book a guide",
        body: "Find guides with experience in career and life-direction conversations.",
      },
    ],
    related: [
      { label: "Antisemitism support", slug: "antisemitism-support" },
      { label: "Life advice", slug: "talk-to-a-rabbi-online" },
    ],
  },
];

export function getTopicPage(slug: string) {
  return TOPIC_PAGES.find((p) => p.slug === slug);
}
