import type { SupervisorEvent } from "../domain/events";

export function createOrchestrator(input: {
  emit: (type: string, payload?: Record<string, unknown>) => void;
}) {
  return {
    handle(event: SupervisorEvent) {
      if (event.type === "session.idle") {
        input.emit("agent.progress.requested", {
          sessionId: event.payload.sessionId
        });
      }
    }
  };
}
