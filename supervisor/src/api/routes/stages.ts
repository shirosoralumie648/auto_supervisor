import type { FastifyInstance } from "fastify";

export function registerStagesRoute(app: FastifyInstance, stages: unknown[]) {
  app.get("/stages", async () => stages);
}
