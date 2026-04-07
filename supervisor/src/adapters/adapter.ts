export interface NormalizedSupervisorEvent {
  type:
    | "session.started"
    | "session.idle"
    | "session.stopped"
    | "agent.progress.reported";
  payload: Record<string, unknown>;
}

export interface SupervisorAdapter {
  start(): Promise<void>;
  stop(): Promise<void>;
}
