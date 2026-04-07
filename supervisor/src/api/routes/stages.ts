import type { FastifyInstance } from "fastify";

export function registerStagesRoute(
  app: FastifyInstance,
  getStages: () => unknown[]
) {
  app.get("/stages", async () => getStages());
}
