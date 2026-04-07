export const apiClient = {
  async getOverview() {
    const response = await fetch("/sessions");
    const sessions = (await response.json()) as Array<{
      sessionId: string;
      status: string;
      agentType: string;
    }>;

    return { sessions };
  },

  async getSessionDetail(sessionId: string) {
    const response = await fetch(`/sessions/${sessionId}`);
    return (await response.json()) as {
      sessionId: string;
      status: string;
      agentType: string;
      events: string[];
    };
  },

  async getRoadmapStatus() {
    const response = await fetch("/stages");
    const stages = (await response.json()) as Array<{
      stageId: string;
      status: string;
    }>;

    return { stages };
  }
};
