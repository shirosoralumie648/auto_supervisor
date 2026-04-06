export type AttachCommandInput = {
  sessionId: string;
  target?: string;
};

export function attachCommand({ sessionId, target = "current terminal" }: AttachCommandInput) {
  return `Attach session ${sessionId} to ${target}.`;
}
