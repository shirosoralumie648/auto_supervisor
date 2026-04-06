import type { FastifyInstance } from "fastify";

export function registerSessionsRoute(app: FastifyInstance, sessions: unknown[]) {
  app.get("/sessions", async () => sessions);
}
