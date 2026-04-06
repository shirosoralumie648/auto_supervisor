import { describe, expect, it } from "vitest";

import { createOrchestrator } from "./orchestrator";

describe("createOrchestrator", () => {
  it("emits agent progress requested when a session becomes idle", () => {
    const emitted: Array<{ type: string; payload?: Record<string, unknown> }> = [];
    const orchestrator = createOrchestrator({
      emit(type, payload) {
        emitted.push({ type, payload });
      }
    });

    orchestrator.handle({
      type: "session.idle",
      payload: { sessionId: "s1" },
      occurredAt: "2026-04-05T00:00:30.000Z",
      sequence: 1
    });

    expect(emitted).toContainEqual({
      type: "agent.progress.requested",
      payload: { sessionId: "s1" }
    });
  });
});
