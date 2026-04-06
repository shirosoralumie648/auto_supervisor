import type { SupervisorEvent } from "../domain/events";

import {
  reduceArtifactState,
  type ArtifactState
} from "./artifact-state";
import {
  reduceSessionRuntime,
  type SessionRuntimeState
} from "./session-runtime";
import { reduceStageState, type StageState } from "./stage-state";

export type ProjectionState = {
  sessions: SessionRuntimeState;
  artifacts: ArtifactState;
  stages: StageState;
};

export function replayEvents(events: SupervisorEvent[]): ProjectionState {
  const sessions: SessionRuntimeState = {};
  const artifacts: ArtifactState = {
    byPath: {},
    reviewsByPath: {}
  };
  const stages: StageState = {};

  for (const event of events) {
    reduceSessionRuntime(sessions, event);
    reduceArtifactState(artifacts, event);
    reduceStageState(stages, event);
  }

  return {
    sessions,
    artifacts,
    stages
  };
}
