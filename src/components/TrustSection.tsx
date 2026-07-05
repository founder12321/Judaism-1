import Link from "next/link";

const items = [
  {
    title: "How vetting works",
    body: "Every guide on Judaism 1 is reviewed for relevant Jewish education, pastoral experience, references, and fit for one-on-one guidance. We also require providers to follow Judaism 1's code of conduct and pastoral-care boundaries.",
  },
  {
    title: "Are sessions confidential?",
    body: "Sessions are private between you and your guide, subject to legal and safety limits. Judaism 1 does not record sessions.",
  },
  {
    title: "What happens after I book?",
    body: "You'll receive a confirmation, your guide's session details, and any next steps before your appointment.",
  },
  {
    title: "Payments and cancellations",
    body: "Payment is processed securely through Stripe at checkout. Cancellation and refund terms are shown before you pay.",
    link: { href: "/legal/terms", label: "Terms of Service" },
  },
  {
    title: "Report a concern",
    body: "If you have a safety or conduct concern about a guide or session, contact us and we will review promptly.",
    link: { href: `mailto:support@judaism1.com`, label: "support@judaism1.com" },
  },
];

export function TrustSection({ className = "" }: { className?: string }) {
  return (
    <section className={className}>
      <h2 className="text-xl font-semibold text-stone-900">Before you book</h2>
      <p className="mt-2 text-sm text-stone-600">
        Judaism 1 is a booking platform connecting you with independent guides. We vet providers
        and facilitate scheduling and payment. Guides deliver the session itself.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-stone-200 bg-white p-5 text-sm"
          >
            <h3 className="font-medium text-stone-900">{item.title}</h3>
            <p className="mt-2 text-stone-600">{item.body}</p>
            {item.link && (
              <Link href={item.link.href} className="mt-2 inline-block font-medium text-amber-800 underline">
                {item.link.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
