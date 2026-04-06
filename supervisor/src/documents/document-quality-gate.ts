import type { ParsedDocument } from "./document-parser";

export type DocumentQualityAssessment = {
  confidence: "low" | "high";
  reasons: string[];
};

export function assessDocumentQuality(
  document: ParsedDocument,
  kind: string
): DocumentQualityAssessment {
  if (kind === "roadmap" && !document.hasDoneWhen) {
    return {
      confidence: "low",
      reasons: ["missing completion criteria"]
    };
  }

  return {
    confidence: "high",
    reasons: []
  };
}
