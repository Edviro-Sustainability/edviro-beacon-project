-- Beacon Project applications schema
CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  school TEXT NOT NULL,
  grade TEXT NOT NULL,
  location TEXT NOT NULL,
  track TEXT NOT NULL CHECK (track IN ('data', 'policy')),
  why_essay TEXT NOT NULL,
  change_essay TEXT NOT NULL,
  resume_url TEXT,
  status TEXT NOT NULL DEFAULT 'new'
);

CREATE INDEX IF NOT EXISTS idx_applications_created_at
  ON applications (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_applications_track
  ON applications (track);
