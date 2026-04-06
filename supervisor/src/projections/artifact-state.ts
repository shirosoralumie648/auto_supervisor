import type { SupervisorEvent } from "../domain/events";

export type ArtifactRecord = {
  path: string;
  kind?: string;
  content?: string;
  updatedAt: string;
  sequence: number;
};

export type ArtifactReviewRecord = {
  path: string;
  decision: string;
  summary?: string;
  findings: string[];
  updatedAt: string;
  sequence: number;
};

export type ArtifactState = {
  byPath: Record<string, ArtifactRecord>;
  reviewsByPath: Record<string, ArtifactReviewRecord>;
};

function readString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function readStringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

export function reduceArtifactState(
  state: ArtifactState,
  event: SupervisorEvent
): ArtifactState {
  if (event.type === "artifact.updated") {
    const path = readString(event.payload.path);

    if (!path) {
      return state;
    }

    state.byPath[path] = {
      path,
      kind: readString(event.payload.kind),
      content: readString(event.payload.content),
      updatedAt: event.occurredAt,
      sequence: event.sequence
    };
  }

  if (event.type === "artifact.reviewed") {
    const path = readString(event.payload.path);
    const decision = readString(event.payload.decision);

    if (!path || !decision) {
      return state;
    }

    state.reviewsByPath[path] = {
      path,
      decision,
      summary: readString(event.payload.summary),
      findings: readStringList(event.payload.findings),
      updatedAt: event.occurredAt,
      sequence: event.sequence
    };
  }

  return state;
}
