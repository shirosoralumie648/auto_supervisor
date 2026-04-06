export const apiClient = {
  getOverview: async () => ({ sessions: [] as Array<{ sessionId: string; status: string; agentType: string }> }),
  getSessionDetail: async (_sessionId: string) => ({ sessionId: "", status: "", agentType: "", events: [] as string[] }),
  getRoadmapStatus: async () => ({ stages: [] as string[] })
};
