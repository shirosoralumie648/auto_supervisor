export type TerminalAgentType = "claude-code" | "codex";

export function buildTerminalCommand(agentType: TerminalAgentType): string[] {
  switch (agentType) {
    case "claude-code":
      return ["claude-code", "--output-format", "json", "--no-color"];
    case "codex":
      return ["codex", "--json", "--no-color"];
    default:
      return assertUnreachable(agentType);
  }
}

function assertUnreachable(value: never): never {
  throw new Error(`Unsupported terminal agent type: ${String(value)}`);
}
