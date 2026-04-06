import type { SupervisorEvent } from "../domain/events";

export type StageRecord = {
  stageId: string;
  status: string;
  reason?: string;
  evidence: string[];
  updatedAt: string;
  sequence: number;
};

export type StageState = Record<string, StageRecord>;

function readString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function readEvidence(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

export function reduceStageState(
  state: StageState,
  event: SupervisorEvent
): StageState {
  if (event.type !== "stage.assessed") {
    return state;
  }

  const stageId = readString(event.payload.stageId);
  const status = readString(event.payload.status);

  if (!stageId || !status) {
    return state;
  }

  state[stageId] = {
    stageId,
    status,
    reason: readString(event.payload.reason),
    evidence: readEvidence(event.payload.evidence),
    updatedAt: event.occurredAt,
    sequence: event.sequence
  };

  return state;
}
