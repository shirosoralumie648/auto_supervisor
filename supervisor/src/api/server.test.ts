import { describe, expect, it } from "vitest";

import { buildServer } from "./server";

describe("buildServer", () => {
  it("serves sessions, stages, and reviews from provider functions", async () => {
    const app = buildServer({
      getSessions() {
        return [{ sessionId: "session-1", status: "idle", agentType: "claude-code" }];
      },
      getSessionDetail(sessionId: string) {
        return {
          sessionId,
          status: "idle",
          agentType: "claude-code",
          events: ["session.started", "session.idle"]
        };
      },
      getStages() {
        return [{ stageId: "m1", status: "in_progress" }];
      },
      getReviews() {
        return [{ path: "docs/spec.md", decision: "revise" }];
      }
    });

    const sessionsResponse = await app.inject({ method: "GET", url: "/sessions" });
    const sessionDetailResponse = await app.inject({ method: "GET", url: "/sessions/session-1" });
    const stagesResponse = await app.inject({ method: "GET", url: "/stages" });
    const reviewsResponse = await app.inject({ method: "GET", url: "/reviews" });

    expect(sessionsResponse.json()).toEqual([
      { sessionId: "session-1", status: "idle", agentType: "claude-code" }
    ]);
    expect(sessionDetailResponse.json()).toEqual({
      sessionId: "session-1",
      status: "idle",
      agentType: "claude-code",
      events: ["session.started", "session.idle"]
    });
    expect(stagesResponse.json()).toEqual([{ stageId: "m1", status: "in_progress" }]);
    expect(reviewsResponse.json()).toEqual([{ path: "docs/spec.md", decision: "revise" }]);

    await app.close();
  });
});
