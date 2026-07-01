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

export default function PrivacyPage() {
  const content = loadLegalDoc("privacy-policy.md");
  return (
    <PageShell title="Privacy Policy">
      <div className="prose prose-stone max-w-3xl whitespace-pre-wrap text-sm text-stone-700">
        {content}
      </div>
    </PageShell>
  );
}
