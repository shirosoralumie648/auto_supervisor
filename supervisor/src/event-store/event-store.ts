import type { SupervisorEvent } from "../domain/events";
import type { SqliteDatabase } from "../db/sqlite";

type EventInput = {
  type: SupervisorEvent["type"];
  payload: Record<string, unknown>;
};

type EventRow = {
  sequence: number;
  type: SupervisorEvent["type"];
  occurred_at: string;
  payload_json: string;
};

export function createEventStore(db: SqliteDatabase) {
  const insertEvent = db.prepare(
    `INSERT INTO events (type, occurred_at, payload_json)
     VALUES (?, ?, ?)`
  );
  const readEvents = db.prepare(
    `SELECT sequence, type, occurred_at, payload_json
     FROM events
     ORDER BY sequence ASC`
  );

  return {
    append(events: EventInput[]): void {
      const insertMany = db.transaction((pendingEvents: EventInput[]) => {
        for (const event of pendingEvents) {
          insertEvent.run(
            event.type,
            new Date().toISOString(),
            JSON.stringify(event.payload)
          );
        }
      });

      insertMany(events);
    },

    readAll(): SupervisorEvent[] {
      const eventRows = readEvents.all() as EventRow[];

      return eventRows.map((eventRow) => ({
        sequence: eventRow.sequence,
        type: eventRow.type,
        occurredAt: eventRow.occurred_at,
        payload: JSON.parse(eventRow.payload_json) as Record<string, unknown>
      }));
    }
  };
}
