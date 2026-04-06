import { buildTerminalCommand } from "./terminal-adapter";

export const codexTerminalConfig = {
  agentType: "codex" as const,
  command: buildTerminalCommand("codex")
};
