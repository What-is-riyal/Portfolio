-- D1 schema for the portfolio chat assistant.
-- Apply:  npx wrangler d1 execute priyal-chat --remote --file=chat/schema.sql

CREATE TABLE IF NOT EXISTS turns (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id TEXT    NOT NULL,
  turn_index      INTEGER NOT NULL,
  question        TEXT    NOT NULL,
  answer          TEXT,
  page            TEXT,              -- which page the visitor was on
  country         TEXT,              -- coarse, from Cloudflare. No IP is stored.
  input_tokens    INTEGER,
  output_tokens   INTEGER,
  created_at      TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_turns_conversation ON turns (conversation_id, turn_index);
CREATE INDEX IF NOT EXISTS idx_turns_created      ON turns (created_at DESC);

-- Counters for rate limiting and the daily spend guard.
-- `bucket` is either  ip:<hash>:<minute>  or  global:<date>.
CREATE TABLE IF NOT EXISTS counters (
  bucket   TEXT    PRIMARY KEY,
  hits     INTEGER NOT NULL DEFAULT 0,
  expires  INTEGER NOT NULL          -- unix seconds; rows past this are ignored
);

CREATE INDEX IF NOT EXISTS idx_counters_expires ON counters (expires);
