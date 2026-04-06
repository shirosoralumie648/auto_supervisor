type AcpEvent = {
  type: string;
  properties: {
    sessionID?: string;
    status?: {
      type?: string;
    };
  };
};

type NormalizedSupervisorEvent = {
  type: string;
  payload: {
    sessionId: string | undefined;
  };
};

export function normalizeAcpEvent(
  event: AcpEvent
): NormalizedSupervisorEvent | null {
  if (
    event.type === "session.status" &&
    event.properties.status?.type === "idle" &&
    event.properties.sessionID
  ) {
    return {
      type: "session.idle",
      payload: {
        sessionId: event.properties.sessionID
      }
    };
  }

  return null;
}
