export type ProgressCommandInput = {
  stageId: string;
  status: string;
  reason?: string;
};

export function progressCommand({ stageId, status, reason }: ProgressCommandInput) {
  return `${stageId}\t${status}${reason ? `\t${reason}` : ""}`;
}
