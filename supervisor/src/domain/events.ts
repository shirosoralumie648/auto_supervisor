export type SupervisorEventType =
  | "session.started"
  | "session.idle"
  | "session.stopped"
  | "artifact.updated"
  | "artifact.reviewed"
  | "agent.progress.requested"
  | "agent.progress.reported"
  | "stage.assessed";

export type SupervisorEvent = {
  sequence: number;
  type: SupervisorEventType;
  occurredAt: string;
  payload: Record<string, unknown>;
};

export function makeEvent(
  type: SupervisorEventType,
  payload: Record<string, unknown>,
  sequence = 0
): SupervisorEvent {
  return {
    sequence,
    type,
    occurredAt: new Date(0).toISOString(),
    payload
  };
}
