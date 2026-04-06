import { describe, expect, it } from "vitest";

import { approveCommand } from "./commands/approve";
import { attachCommand } from "./commands/attach";
import { progressCommand } from "./commands/progress";
import { reviewCommand } from "./commands/review";
import { sessionCommand } from "./commands/session";
import { formatSessions } from "./commands/sessions";

describe("formatSessions", () => {
  it("includes session id and status", () => {
    const result = formatSessions([
      { sessionId: "s1", status: "idle", agentType: "opencode" }
    ]);

    expect(result).toContain("s1");
    expect(result).toContain("idle");
  });
});

describe("CLI commands", () => {
  it("formats attach command output", () => {
    expect(attachCommand({ sessionId: "s1", target: "pane-1" })).toBe(
      "Attach session s1 to pane-1."
    );
  });

  it("formats a single session summary", () => {
    expect(
      sessionCommand({ sessionId: "s1", status: "running", agentType: "opencode" })
    ).toBe("s1\topencode\trunning");
  });

  it("formats review command output", () => {
    expect(
      reviewCommand({
        path: "specs/core.md",
        decision: "revise",
        summary: "Needs rollback plan"
      })
    ).toBe("specs/core.md\trevise\tNeeds rollback plan");
  });

  it("formats progress command output", () => {
    expect(
      progressCommand({
        stageId: "review",
        status: "blocked",
        reason: "Missing evidence"
      })
    ).toBe("review\tblocked\tMissing evidence");
  });

  it("formats approve command output", () => {
    expect(
      approveCommand({
        path: "specs/core.md",
        decision: "needs_human",
        actor: "reviewer-1"
      })
    ).toBe("specs/core.md\tneeds_human\treviewer-1");
  });
});
