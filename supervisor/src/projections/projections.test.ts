import { describe, expect, it } from "vitest";

import { replayEvents } from "./replay";

describe("replayEvents", () => {
  it("marks a started session as idle after replaying session.idle", () => {
    const state = replayEvents([
      {
        sequence: 1,
        type: "session.started",
        occurredAt: "2026-04-05T00:00:00.000Z",
        payload: {
          sessionId: "s1",
          agentType: "opencode",
          adapterType: "acp"
        }
      },
      {
        sequence: 2,
        type: "session.idle",
        occurredAt: "2026-04-05T00:00:30.000Z",
        payload: {
          sessionId: "s1"
        }
      }
    ]);

    expect(state.sessions["s1"]?.status).toBe("idle");
  });

  it("tracks the latest artifact update and review by path", () => {
    const state = replayEvents([
      {
        sequence: 1,
        type: "artifact.updated",
        occurredAt: "2026-04-05T00:00:00.000Z",
        payload: {
          path: "specs/core.md",
          kind: "spec",
          content: "draft"
        }
      },
      {
        sequence: 2,
        type: "artifact.updated",
        occurredAt: "2026-04-05T00:01:00.000Z",
        payload: {
          path: "specs/core.md",
          kind: "spec",
          content: "revised"
        }
      },
      {
        sequence: 3,
        type: "artifact.reviewed",
        occurredAt: "2026-04-05T00:02:00.000Z",
        payload: {
          path: "specs/core.md",
          decision: "revise",
          summary: "Needs more detail",
          findings: ["Missing rollback plan"]
        }
      }
    ]);

    expect(state.artifacts.byPath["specs/core.md"]).toEqual({
      path: "specs/core.md",
      kind: "spec",
      content: "revised",
      updatedAt: "2026-04-05T00:01:00.000Z",
      sequence: 2
    });
    expect(state.artifacts.reviewsByPath["specs/core.md"]).toEqual({
      path: "specs/core.md",
      decision: "revise",
      summary: "Needs more detail",
      findings: ["Missing rollback plan"],
      updatedAt: "2026-04-05T00:02:00.000Z",
      sequence: 3
    });
  });

  it("tracks the latest stage assessment by stage id", () => {
    const state = replayEvents([
      {
        sequence: 1,
        type: "stage.assessed",
        occurredAt: "2026-04-05T00:00:00.000Z",
        payload: {
          stageId: "review",
          status: "in_progress",
          reason: "Waiting for evidence",
          evidence: []
        }
      },
      {
        sequence: 2,
        type: "stage.assessed",
        occurredAt: "2026-04-05T00:01:00.000Z",
        payload: {
          stageId: "review",
          status: "completed",
          reason: "Criteria met",
          evidence: ["specs/core.md"]
        }
      }
    ]);

    expect(state.stages.review).toEqual({
      stageId: "review",
      status: "completed",
      reason: "Criteria met",
      evidence: ["specs/core.md"],
      updatedAt: "2026-04-05T00:01:00.000Z",
      sequence: 2
    });
  });
});
