export type ApproveCommandInput = {
  path: string;
  decision: string;
  actor?: string;
};

export function approveCommand({ path, decision, actor = "system" }: ApproveCommandInput) {
  return `${path}\t${decision}\t${actor}`;
}
