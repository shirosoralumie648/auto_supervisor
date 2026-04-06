import { describe, expect, it } from "vitest";

import { decideApproval } from "./approval-policy-service";
import { reconcileProgress } from "./progress-reconciler";
import { reviewSpec } from "./spec-review-service";
import { judgeStageCompletion } from "./stage-completion-judge";

describe("services", () => {
  it("routes low-confidence passing reviews to human approval", () => {
    expect(
      decideApproval({
        reviewDecision: "pass",
        documentConfidence: "low",
        artifactComplete: true
      })
    ).toBe("needs_human");
  });

  it("keeps revise decisions ahead of low-confidence escalation", () => {
    expect(
      decideApproval({
        reviewDecision: "revise",
        documentConfidence: "low",
        artifactComplete: true
      })
    ).toBe("revise");
  });

  it("keeps block decisions ahead of low-confidence escalation", () => {
    expect(
      decideApproval({
        reviewDecision: "block",
        documentConfidence: "low",
        artifactComplete: true
      })
    ).toBe("block");
  });

  it("marks incomplete artifacts for revision before low-confidence escalation", () => {
    expect(
      decideApproval({
        reviewDecision: "pass",
        documentConfidence: "low",
        artifactComplete: false
      })
    ).toBe("revise");
  });

  it("marks a stage complete when criteria are met and evidence exists", () => {
    expect(
      judgeStageCompletion({
        completionCriteriaMet: true,
        evidenceCount: 2
      })
    ).toBe("completed");
  });

  it("keeps a stage in progress when completion criteria are not met", () => {
    expect(
      judgeStageCompletion({
        completionCriteriaMet: false,
        evidenceCount: 2
      })
    ).toBe("in_progress");
  });

  it("blocks a stage when criteria are met but no evidence exists", () => {
    expect(
      judgeStageCompletion({
        completionCriteriaMet: true,
        evidenceCount: 0
      })
    ).toBe("blocked");
  });

  it("marks progress complete when the required stage is claimed", () => {
    expect(
      reconcileProgress({
        claimedCompletedStages: ["draft", "review"],
        requiredStageId: "review"
      })
    ).toEqual({ completionCriteriaMet: true });
  });

  it("marks progress incomplete when the required stage is missing", () => {
    expect(
      reconcileProgress({
        claimedCompletedStages: ["draft"],
        requiredStageId: "review"
      })
    ).toEqual({ completionCriteriaMet: false });
  });

  it("passes spec reviews with strong scores and no findings", () => {
    expect(reviewSpec({ score: 92 })).toEqual({
      decision: "pass",
      score: 92,
      findings: [],
      summary: "Spec review passed."
    });
  });

  it("requests revision when findings exist even with a good score", () => {
    expect(
      reviewSpec({
        score: 88,
        findings: ["Add rollout steps"],
        summary: "Almost ready"
      })
    ).toEqual({
      decision: "revise",
      score: 88,
      findings: ["Add rollout steps"],
      summary: "Almost ready"
    });
  });

  it("blocks spec reviews with very low scores", () => {
    expect(reviewSpec({ score: 35 })).toEqual({
      decision: "block",
      score: 35,
      findings: [],
      summary: "Spec review is blocked."
    });
  });
});
