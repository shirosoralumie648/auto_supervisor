import Fastify from "fastify";

import { registerReviewsRoute } from "./routes/reviews";
import { registerSessionsRoute } from "./routes/sessions";
import { registerStagesRoute } from "./routes/stages";

export type ServerData = {
  getSessions: () => unknown[];
  getSessionDetail: (sessionId: string) => unknown;
  getStages: () => unknown[];
  getReviews: () => unknown[];
};

export function buildServer(data: ServerData) {
  const app = Fastify();

  registerSessionsRoute(app, data.getSessions, data.getSessionDetail);
  registerStagesRoute(app, data.getStages);
  registerReviewsRoute(app, data.getReviews);

  return app;
}
