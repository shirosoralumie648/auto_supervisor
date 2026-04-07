import type { FastifyInstance } from "fastify";

export function registerReviewsRoute(
  app: FastifyInstance,
  getReviews: () => unknown[]
) {
  app.get("/reviews", async () => getReviews());
}
