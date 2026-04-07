import type { FastifyInstance } from "fastify";

export function registerSessionsRoute(
  app: FastifyInstance,
  getSessions: () => unknown[],
  getSessionDetail: (sessionId: string) => unknown
) {
  app.get("/sessions", async () => getSessions());
  app.get("/sessions/:sessionId", async (request) => {
    const { sessionId } = request.params as { sessionId: string };
    return getSessionDetail(sessionId);
  });
}
