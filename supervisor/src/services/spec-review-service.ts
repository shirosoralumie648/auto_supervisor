export type SpecReviewDecision = "pass" | "revise" | "block";

export type SpecReviewInput = {
  score: number;
  findings?: string[];
  summary?: string;
};

export type SpecReviewResult = {
  decision: SpecReviewDecision;
  score: number;
  summary: string;
  findings: string[];
};

export function reviewSpec({
  score,
  findings = [],
  summary
}: SpecReviewInput): SpecReviewResult {
  const normalizedFindings = findings.filter(
    (finding): finding is string => typeof finding === "string" && finding.trim().length > 0
  );

  const decision = score < 40 ? "block" : score < 70 || normalizedFindings.length > 0 ? "revise" : "pass";

  return {
    decision,
    score,
    findings: normalizedFindings,
    summary:
      summary ??
      (decision === "pass"
        ? "Spec review passed."
        : decision === "revise"
          ? "Spec review needs revision."
          : "Spec review is blocked.")
  };
}
