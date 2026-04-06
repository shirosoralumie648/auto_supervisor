export type ReviewDecision = "pass" | "revise" | "block";
export type DocumentConfidence = "low" | "high";
export type ApprovalDecision = ReviewDecision | "needs_human";

export type ApprovalPolicyInput = {
  reviewDecision: ReviewDecision;
  documentConfidence: DocumentConfidence;
  artifactComplete: boolean;
};

export function decideApproval({
  reviewDecision,
  documentConfidence,
  artifactComplete
}: ApprovalPolicyInput): ApprovalDecision {
  if (reviewDecision === "block") {
    return "block";
  }

  if (reviewDecision === "revise" || !artifactComplete) {
    return "revise";
  }

  if (documentConfidence === "low") {
    return "needs_human";
  }

  return reviewDecision;
}
