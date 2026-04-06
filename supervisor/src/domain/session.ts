export type AgentType = "opencode" | "claude-code" | "codex";

export type AdapterType = "acp" | "terminal";

export type SessionStatus =
  | "starting"
  | "running"
  | "idle"
  | "waiting_approval"
  | "stopped"
  | "paused";
