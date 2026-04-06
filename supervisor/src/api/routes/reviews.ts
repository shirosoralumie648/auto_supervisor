import type { FastifyInstance } from "fastify";

export function registerReviewsRoute(app: FastifyInstance, reviews: unknown[]) {
  app.get("/reviews", async () => reviews);
}
