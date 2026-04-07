export type TerminalAgentType = "claude-code" | "codex";

export type TerminalLifecycleEvent =
  | {
      type: "session.started";
      sessionId: string;
      agentType: TerminalAgentType;
    }
  | {
      type: "session.idle" | "session.stopped";
      sessionId: string;
    }
  | {
      type: "agent.progress.reported";
      sessionId: string;
      summary: string;
      claimedCompletedStages: string[];
    };

export function buildTerminalCommand(agentType: TerminalAgentType): string[] {
  switch (agentType) {
    case "claude-code":
      return ["claude-code", "--output-format", "json", "--no-color"];
    case "codex":
      return ["codex", "--json", "--no-color"];
  }
}

export function normalizeTerminalEvent(
  agentType: TerminalAgentType,
  event: TerminalLifecycleEvent
) {
  if (event.type === "session.started") {
    return {
      type: "session.started" as const,
      payload: {
        sessionId: event.sessionId,
        agentType,
        adapterType: "terminal"
      }
    };
  }

  if (event.type === "session.idle" || event.type === "session.stopped") {
    return {
      type: event.type,
      payload: {
        sessionId: event.sessionId
      }
    };
  }

  if (event.type === "agent.progress.reported") {
    return {
      type: "agent.progress.reported" as const,
      payload: {
        sessionId: event.sessionId,
        summary: event.summary,
        claimedCompletedStages: event.claimedCompletedStages
      }
    };
  }

  throw new Error(`Unsupported terminal event: ${String((event as { type?: unknown }).type)}`);
}
