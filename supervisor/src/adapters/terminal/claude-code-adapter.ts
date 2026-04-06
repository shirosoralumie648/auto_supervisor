import { buildTerminalCommand } from "./terminal-adapter";

export const claudeCodeTerminalConfig = {
  agentType: "claude-code" as const,
  command: buildTerminalCommand("claude-code")
};
