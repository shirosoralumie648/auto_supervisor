export type SupervisorEvent = {
  sequence: number;
  type: string;
  occurredAt: string;
  payload: Record<string, unknown>;
};

export function makeEvent(
  type: string,
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
