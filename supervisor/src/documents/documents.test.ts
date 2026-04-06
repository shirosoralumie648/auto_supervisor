import { describe, expect, it } from "vitest";

import { parseMarkdownDocument } from "./document-parser";
import { assessDocumentQuality } from "./document-quality-gate";

describe("documents", () => {
  it("parses headings with leading whitespace and done_when consistently", () => {
    const document = parseMarkdownDocument(
      "  # Stage foundation\n\n\t## Deliverables\nShip core\n\nDONE_WHEN: smoke tests pass\n"
    );

    expect(document.headings).toEqual(["Stage foundation", "Deliverables"]);
    expect(document.hasDoneWhen).toBe(true);
  });

  it("returns low confidence with roadmap-specific reason when completion criteria are missing", () => {
    const document = parseMarkdownDocument("# Stage foundation\n\n## Goal\nShip core\n");

    expect(assessDocumentQuality(document, "roadmap")).toEqual({
      confidence: "low",
      reasons: ["missing completion criteria"]
    });
  });

  it("returns high confidence for roadmap documents with completion criteria", () => {
    const document = parseMarkdownDocument(
      "# Stage foundation\n\nCompletion Criteria\n- smoke tests pass\n"
    );

    expect(assessDocumentQuality(document, "roadmap")).toEqual({
      confidence: "high",
      reasons: []
    });
  });

  it("does not apply roadmap-only checks to other document kinds", () => {
    const document = parseMarkdownDocument("# Notes\n\nNo completion language yet\n");

    expect(assessDocumentQuality(document, "notes")).toEqual({
      confidence: "high",
      reasons: []
    });
  });
});
