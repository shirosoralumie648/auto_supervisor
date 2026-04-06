import Fastify from "fastify";

import { registerReviewsRoute } from "./routes/reviews";
import { registerSessionsRoute } from "./routes/sessions";
import { registerStagesRoute } from "./routes/stages";

export type ServerData = {
  sessions: unknown[];
  stages: unknown[];
  reviews: unknown[];
};

export function buildServer(data: ServerData) {
  const app = Fastify();

  registerSessionsRoute(app, data.sessions);
  registerStagesRoute(app, data.stages);
  registerReviewsRoute(app, data.reviews);

  return app;
}
