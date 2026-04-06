import { describe, expect, it } from "vitest";

import { buildServer } from "./server";

describe("buildServer", () => {
  it("returns sessions from GET /sessions", async () => {
    const app = buildServer({
      sessions: [
        {
          sessionId: "s1",
          status: "idle",
          agentType: "opencode",
          adapterType: "acp"
        }
      ],
      stages: [],
      reviews: []
    });

    const response = await app.inject({
      method: "GET",
      url: "/sessions"
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()[0].sessionId).toBe("s1");

    await app.close();
  });
});
