import { describe, expect, it } from "vitest";

import { normalizeAcpEvent } from "./acp-adapter";

describe("normalizeAcpEvent", () => {
  it("maps idle session status events to session.idle supervisor events", () => {
    expect(
      normalizeAcpEvent({
        type: "session.status",
        properties: {
          sessionID: "s1",
          status: {
            type: "idle"
          }
        }
      })
    ).toEqual({
      type: "session.idle",
      payload: {
        sessionId: "s1"
      }
    });
  });

  it("returns null when sessionID is missing", () => {
    expect(
      normalizeAcpEvent({
        type: "session.status",
        properties: {
          status: {
            type: "idle"
          }
        }
      })
    ).toBeNull();
  });

  it("returns null for non-idle or unrelated events", () => {
    expect(
      normalizeAcpEvent({
        type: "session.status",
        properties: {
          sessionID: "s1",
          status: {
            type: "active"
          }
        }
      })
    ).toBeNull();

    expect(
      normalizeAcpEvent({
        type: "message.created",
        properties: {
          sessionID: "s1"
        }
      })
    ).toBeNull();
  });
});
