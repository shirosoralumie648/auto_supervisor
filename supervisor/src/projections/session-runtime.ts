import type { SupervisorEvent } from "../domain/events";
import type { AdapterType, AgentType, SessionStatus } from "../domain/session";

export type SessionRuntime = {
  sessionId: string;
  agentType: AgentType;
  adapterType: AdapterType;
  status: SessionStatus;
  currentTask: string | null;
  lastEventAt: string;
  lastKnownSpec: string | null;
  lastKnownStage: string | null;
};

export type SessionRuntimeState = Record<string, SessionRuntime>;

export function reduceSessionRuntime(
  state: SessionRuntimeState,
  event: SupervisorEvent
): SessionRuntimeState {
  if (event.type === "session.started") {
    const sessionId = String(event.payload.sessionId);
    const agentType = event.payload.agentType as AgentType;
    const adapterType = event.payload.adapterType as AdapterType;

    state[sessionId] = {
      sessionId,
      agentType,
      adapterType,
      status: "running",
      currentTask: null,
      lastEventAt: event.occurredAt,
      lastKnownSpec: null,
      lastKnownStage: null
    };
  }

  if (event.type === "session.idle") {
    const sessionId = String(event.payload.sessionId);
    const session = state[sessionId];

    if (session) {
      session.status = "idle";
      session.lastEventAt = event.occurredAt;
    }
  }

  if (event.type === "session.stopped") {
    const sessionId = String(event.payload.sessionId);
    const session = state[sessionId];

    if (session) {
      session.status = "stopped";
      session.lastEventAt = event.occurredAt;
    }
  }

  return state;
}
