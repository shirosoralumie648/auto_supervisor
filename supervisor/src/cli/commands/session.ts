export type SessionCommandInput = {
  sessionId: string;
  status: string;
  agentType: string;
};

export function sessionCommand({ sessionId, status, agentType }: SessionCommandInput) {
  return `${sessionId}\t${agentType}\t${status}`;
}
