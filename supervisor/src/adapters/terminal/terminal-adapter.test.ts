import { describe, expect, it } from "vitest";

import { shouldTriggerIdleReconcile } from "../../orchestrator/debounce";
import { buildTerminalCommand, normalizeTerminalEvent } from "./terminal-adapter";

describe("terminal adapter helpers", () => {
  it("returns normalized command for claude-code", () => {
    expect(buildTerminalCommand("claude-code")).toEqual([
      "claude-code",
      "--output-format",
      "json",
      "--no-color"
    ]);
  });

  it("normalizes idle lifecycle events for claude-code", () => {
    expect(
      normalizeTerminalEvent("claude-code", {
        type: "session.idle",
        sessionId: "session-1"
      })
    ).toEqual({
      type: "session.idle",
      payload: { sessionId: "session-1" }
    });
  });

  it("returns normalized command for codex", () => {
    expect(buildTerminalCommand("codex")).toEqual([
      "codex",
      "--json",
      "--no-color"
    ]);
  });

  it("does not trigger idle reconcile before the threshold", () => {
    expect(
      shouldTriggerIdleReconcile({
        lastOutputAt: 0,
        now: 29_000,
        thresholdMs: 30_000
      })
    ).toBe(false);
  });

  it("triggers idle reconcile at the threshold boundary", () => {
    expect(
      shouldTriggerIdleReconcile({
        lastOutputAt: 0,
        now: 30_000,
        thresholdMs: 30_000
      })
    ).toBe(true);
  });

  it("does not trigger idle reconcile when the clock moves backwards", () => {
    expect(
      shouldTriggerIdleReconcile({
        lastOutputAt: 30_000,
        now: 29_999,
        thresholdMs: 30_000
      })
    ).toBe(false);
  });
});
