import Link from "next/link";
import { PageShell } from "@/components/ui";
import { PastoralBoundaryNotice } from "@/components/PastoralBoundaryNotice";
import { EMERGENCY_NOTICE, GUIDE_PAYOUT_PERCENT } from "@/lib/constants";

const FAQ_ITEMS = [
  {
    q: "Is Judaism 1 therapy?",
    a: "No. Judaism 1 provides Jewish pastoral guidance, learning, and spiritual support. It is not psychotherapy, medical care, legal advice, or crisis intervention.",
  },
  {
    q: "Do I need to be religious?",
    a: "No. Many people use Judaism 1 while exploring, reconnecting, or building Jewish life at their own pace.",
  },
  {
    q: "Do I need synagogue membership?",
    a: "No. Sessions are booked directly with individual guides. Judaism 1 complements synagogue life; it does not replace it.",
  },
  {
    q: "Can I choose denomination or background?",
    a: "Yes. Filter guides by background and topic when browsing or matching.",
  },
  {
    q: "Are sessions confidential?",
    a: "Sessions are private between you and your guide, subject to legal and safety limits. Guides agree to confidentiality standards in our provider agreement.",
  },
  {
    q: "Are sessions recorded?",
    a: "No. Judaism 1 does not record sessions.",
  },
  {
    q: "What can I talk about?",
    a: "Life questions, Jewish learning, grief, family, conversion, interfaith dynamics, parenting, Shabbat and holidays, antisemitism, career and purpose, and more. See our topics pages for examples.",
  },
  {
    q: "What if I need mental health support?",
    a: "Contact a licensed mental health professional or crisis hotline. Judaism 1 is not an emergency service. " + EMERGENCY_NOTICE,
  },
  {
    q: "Can couples or families book?",
    a: "Sessions are designed as one-on-one by default. If you need a joint session, contact support@judaism1.com and we can help coordinate with a guide.",
  },
  {
    q: "Can minors use the platform?",
    a: "No. You must be at least 18 to create an account and book.",
  },
  {
    q: "How are guides vetted?",
    a: "We review credentials, experience, references, and fit for one-on-one guidance. Providers complete boundary training and agree to our code of conduct.",
  },
  {
    q: "How do refunds and cancellations work?",
    a: "Cancel at least 24 hours before your session for a full refund. Details are in our Terms of Service.",
    link: { href: "/legal/terms", label: "Terms of Service" },
  },
  {
    q: "How do guides get paid?",
    a: `Guides connect Stripe and receive ${GUIDE_PAYOUT_PERCENT}% of each session fee after the platform fee. This is explained on the provider application page.`,
    providerOnly: true,
  },
];

export default function FaqPage() {
  const publicItems = FAQ_ITEMS.filter((item) => !item.providerOnly);

  return (
    <PageShell title="FAQ" subtitle="Clear answers about sessions, safety, and how Judaism 1 works.">
      <div className="mx-auto max-w-3xl space-y-8">
        <PastoralBoundaryNotice />

        <div className="space-y-6">
          {publicItems.map((item) => (
            <div key={item.q} className="border-b border-stone-200 pb-6">
              <h2 className="font-medium text-stone-900">{item.q}</h2>
              <p className="mt-2 text-sm text-stone-600">{item.a}</p>
              {item.link && (
                <Link href={item.link.href} className="mt-2 inline-block text-sm font-medium text-amber-800 underline">
                  {item.link.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-stone-200 bg-stone-50 p-5 text-sm text-stone-600">
          <p className="font-medium text-stone-900">Still have questions?</p>
          <p className="mt-2">
            Email{" "}
            <a href="mailto:support@judaism1.com" className="font-medium text-amber-800 underline">
              support@judaism1.com
            </a>
            {" "}or read our{" "}
            <Link href="/legal/disclaimer" className="font-medium text-amber-800 underline">
              session disclaimer
            </Link>
            .
          </p>
        </div>

        <Link
          href="/find"
          className="inline-block rounded-full bg-amber-800 px-6 py-3 text-sm font-medium text-white hover:bg-amber-900"
        >
          Find a guide
        </Link>
      </div>
    </PageShell>
  );
}
