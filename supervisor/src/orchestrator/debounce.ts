export interface IdleReconcileInput {
  lastOutputAt: number;
  now: number;
  thresholdMs: number;
}

export function shouldTriggerIdleReconcile(input: IdleReconcileInput): boolean {
  if (input.now < input.lastOutputAt) {
    return false;
  }

  return input.now - input.lastOutputAt >= input.thresholdMs;
}
