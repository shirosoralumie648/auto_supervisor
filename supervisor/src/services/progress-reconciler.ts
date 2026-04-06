export type ProgressReconciliationInput = {
  claimedCompletedStages: string[];
  requiredStageId: string;
};

export type ProgressReconciliationResult = {
  completionCriteriaMet: boolean;
};

export function reconcileProgress({
  claimedCompletedStages,
  requiredStageId
}: ProgressReconciliationInput): ProgressReconciliationResult {
  return {
    completionCriteriaMet: claimedCompletedStages.includes(requiredStageId)
  };
}
