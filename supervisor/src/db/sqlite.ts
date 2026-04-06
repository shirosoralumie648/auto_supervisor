import Database from "better-sqlite3";

export type SqliteDatabase = Database.Database;

export function createInMemoryDatabase(): SqliteDatabase {
  return new Database(":memory:");
}

export function createDatabase(filename: string): SqliteDatabase {
  return new Database(filename);
}
