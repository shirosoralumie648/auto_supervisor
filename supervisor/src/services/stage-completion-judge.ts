export type StageCompletionInput = {
  completionCriteriaMet: boolean;
  evidenceCount: number;
};

export type StageCompletionStatus = "in_progress" | "completed" | "blocked";

export function judgeStageCompletion({
  completionCriteriaMet,
  evidenceCount
}: StageCompletionInput): StageCompletionStatus {
  if (!completionCriteriaMet) {
    return "in_progress";
  }

  return evidenceCount > 0 ? "completed" : "blocked";
}
