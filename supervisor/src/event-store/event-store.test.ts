import { afterEach, describe, expect, it } from "vitest";

import { createInMemoryDatabase } from "../db/sqlite";
import { migrate } from "../db/migrate";
import { createEventStore } from "./event-store";

describe("createEventStore", () => {
  const databases: Array<{ close: () => void }> = [];

  afterEach(() => {
    while (databases.length > 0) {
      databases.pop()?.close();
    }
  });

  function createMigratedDatabase() {
    const db = createInMemoryDatabase();
    databases.push(db);
    migrate(db);
    return db;
  }

  it("persists payloads and reads them back in sequence order", () => {
    const db = createMigratedDatabase();
    const eventStore = createEventStore(db);

    const firstPayload = {
      sessionId: "session-1",
      agentType: "opencode",
      adapterType: "acp"
    };
    const secondPayload = {
      sessionId: "session-1",
      summary: {
        idleSeconds: 12,
        reason: "awaiting-input"
      }
    };

    eventStore.append([
      {
        type: "session.started",
        payload: firstPayload
      },
      {
        type: "session.idle",
        payload: secondPayload
      }
    ]);

    const events = eventStore.readAll();

    expect(events.map((event) => event.sequence)).toEqual([1, 2]);
    expect(events).toMatchObject([
      {
        sequence: 1,
        type: "session.started",
        payload: firstPayload
      },
      {
        sequence: 2,
        type: "session.idle",
        payload: secondPayload
      }
    ]);
  });

  it("populates occurredAt timestamps when appending events", () => {
    const db = createMigratedDatabase();
    const eventStore = createEventStore(db);

    eventStore.append([
      {
        type: "session.started",
        payload: {
          sessionId: "session-1"
        }
      }
    ]);

    const [event] = eventStore.readAll();

    expect(event).toBeDefined();
    expect(event?.occurredAt).toEqual(expect.any(String));
    expect(Number.isNaN(Date.parse(event!.occurredAt))).toBe(false);
  });

  it("treats empty append as a safe no-op", () => {
    const db = createMigratedDatabase();
    const eventStore = createEventStore(db);

    expect(() => eventStore.append([])).not.toThrow();
    expect(eventStore.readAll()).toEqual([]);
  });

  it("returns events from readAll with their typed payloads", () => {
    const db = createMigratedDatabase();
    const eventStore = createEventStore(db);

    eventStore.append([
      {
        type: "session.started",
        payload: {
          sessionId: "session-typed"
        }
      }
    ]);

    const events = eventStore.readAll();

    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      type: "session.started",
      payload: {
        sessionId: "session-typed"
      }
    });
  });

  it("appends multiple events transactionally", () => {
    const db = createMigratedDatabase();
    const eventStore = createEventStore(db);

    const throwOnSecondInsert = db.transaction(() => {
      db.exec(`
        CREATE TRIGGER events_fail_on_second_insert
        BEFORE INSERT ON events
        WHEN (
          SELECT COUNT(*)
          FROM events
        ) >= 1
        BEGIN
          SELECT RAISE(FAIL, 'simulated insert failure');
        END;
      `);
    });

    throwOnSecondInsert();

    expect(() =>
      eventStore.append([
        {
          type: "session.started",
          payload: {
            sessionId: "session-1"
          }
        },
        {
          type: "session.idle",
          payload: {
            sessionId: "session-1"
          }
        }
      ])
    ).toThrow(/simulated insert failure/);

    expect(eventStore.readAll()).toEqual([]);
  });
});
