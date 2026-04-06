export interface SupervisorAdapter {
  start(): Promise<void>;
  stop(): Promise<void>;
}
