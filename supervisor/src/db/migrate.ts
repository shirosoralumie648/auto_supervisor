import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type { SqliteDatabase } from "./sqlite";

function loadSchemaSql(): string {
  const schemaPath = resolve(dirname(fileURLToPath(import.meta.url)), "schema.sql");
  return readFileSync(schemaPath, "utf8");
}

export function migrate(db: SqliteDatabase): void {
  db.exec(loadSchemaSql());
}
