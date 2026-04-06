export type SessionSummary = {
  sessionId: string;
  agentType: string;
  status: string;
};

export function formatSessions(sessions: SessionSummary[]): string {
  return sessions
    .map(({ sessionId, agentType, status }) => `${sessionId}\t${agentType}\t${status}`)
    .join("\n");
}
