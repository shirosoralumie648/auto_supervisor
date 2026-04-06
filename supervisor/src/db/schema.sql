CREATE TABLE IF NOT EXISTS events (
  sequence INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  occurred_at TEXT NOT NULL,
  payload_json TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS session_runtime (
  session_id TEXT PRIMARY KEY,
  agent_type TEXT NOT NULL,
  adapter_type TEXT NOT NULL,
  status TEXT NOT NULL,
  current_task TEXT,
  last_event_at TEXT NOT NULL,
  last_known_spec TEXT,
  last_known_stage TEXT
);
