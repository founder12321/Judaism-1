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

export default function DisclaimerPage() {
  const content = loadLegalDoc("session-disclaimer.md");
  return (
    <PageShell title="Session Disclaimer">
      <div className="prose prose-stone max-w-3xl whitespace-pre-wrap text-sm text-stone-700">
        {content}
      </div>
    </PageShell>
  );
}
