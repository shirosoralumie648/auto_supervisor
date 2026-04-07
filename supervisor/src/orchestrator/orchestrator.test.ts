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

  it("requests progress when a session stops", () => {
    const emitted: Array<{ type: string; payload?: Record<string, unknown> }> = [];
    const orchestrator = createOrchestrator({
      emit(type, payload) {
        emitted.push({ type, payload });
      }
    });

    orchestrator.handle({
      sequence: 3,
      type: "session.stopped",
      occurredAt: "2026-04-05T00:02:00.000Z",
      payload: { sessionId: "session-1" }
    });

    expect(emitted).toContainEqual({
      type: "agent.progress.requested",
      payload: { sessionId: "session-1" }
    });
  });

  it("emits an approval action after a passing artifact review", () => {
    const emitted: Array<{ type: string; payload?: Record<string, unknown> }> = [];
    const orchestrator = createOrchestrator({
      emit(type, payload) {
        emitted.push({ type, payload });
      }
    });

    orchestrator.handle({
      sequence: 4,
      type: "artifact.reviewed",
      occurredAt: "2026-04-05T00:03:00.000Z",
      payload: { path: "docs/spec.md", decision: "pass" }
    });

    expect(emitted).toContainEqual({
      type: "approval.requested",
      payload: { path: "docs/spec.md", decision: "pass" }
    });
  });
});
