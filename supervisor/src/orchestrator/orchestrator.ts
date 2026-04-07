import type { SupervisorEvent } from "../domain/events";

export function createOrchestrator(input: {
  emit: (type: string, payload?: Record<string, unknown>) => void;
}) {
  return {
    handle(event: SupervisorEvent) {
      if (event.type === "session.idle" || event.type === "session.stopped") {
        input.emit("agent.progress.requested", {
          sessionId: event.payload.sessionId
        });
      }

      if (event.type === "artifact.reviewed") {
        input.emit("approval.requested", {
          path: event.payload.path,
          decision: event.payload.decision
        });
      }
    }
  };
}
