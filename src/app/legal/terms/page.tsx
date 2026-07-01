import { readFileSync } from "fs";
import { join } from "path";
import { PageShell } from "@/components/ui";

function loadLegalDoc(filename: string) {
  try {
    return readFileSync(join(process.cwd(), "docs/legal", filename), "utf-8");
  } catch {
    return "Document not found.";
  }
}

function LegalDocPage({ title, filename }: { title: string; filename: string }) {
  const content = loadLegalDoc(filename);
  return (
    <PageShell title={title}>
      <div className="prose prose-stone max-w-3xl whitespace-pre-wrap text-sm text-stone-700">
        {content}
      </div>
    </PageShell>
  );
}

export default function TermsPage() {
  return <LegalDocPage title="Terms of Service" filename="terms-of-service.md" />;
}
