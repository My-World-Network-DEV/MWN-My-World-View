-- Core schema for My World View (initial migration)

-- 0) UUIDs (needed for gen_random_uuid())
CREATE EXTENSION IF NOT EXISTS "pgcrypto";  -- provides gen_random_uuid() v4  ✔

-- 1) users
CREATE TABLE IF NOT EXISTS users (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text UNIQUE,
  display_name text,
  avatar_url  text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- 2) topics
CREATE TABLE IF NOT EXISTS topics (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text UNIQUE NOT NULL,
  title       text NOT NULL,
  description text,
  created_by  uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- 3) issues
CREATE TABLE IF NOT EXISTS issues (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id    uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  title       text NOT NULL,
  description text,
  created_by  uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- 4) motions
CREATE TABLE IF NOT EXISTS motions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id    uuid NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
  title       text NOT NULL,
  description text,
  created_by  uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- 5) posts (general micro-posts)
CREATE TABLE IF NOT EXISTS posts (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES users(id) ON DELETE SET NULL,
  content     text NOT NULL,
  metadata    jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- 6) stance_events (append-only)
--    Keeping your original text stance (for/against/abstain) but validating it.
CREATE TABLE IF NOT EXISTS stance_events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES users(id) ON DELETE SET NULL,   -- nullable now; require auth via RLS later
  motion_id   uuid NOT NULL REFERENCES motions(id) ON DELETE CASCADE,
  stance      text NOT NULL CHECK (stance IN ('for','against','abstain')),
  reason_text text,
  metadata    jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- 7) census_snapshots (rollups – optional, raw counts now; weighted later)
CREATE TABLE IF NOT EXISTS census_snapshots (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  motion_id        uuid NOT NULL REFERENCES motions(id) ON DELETE CASCADE,
  total_count      bigint NOT NULL DEFAULT 0,
  counts           jsonb  NOT NULL DEFAULT '{}'::jsonb,  -- e.g. {"for":12,"against":8,"abstain":3}
  snapshot_at      timestamptz NOT NULL DEFAULT now()
);

-- 8) helpful indexes
CREATE INDEX IF NOT EXISTS idx_topics_slug          ON topics(slug);
CREATE INDEX IF NOT EXISTS idx_posts_created_at     ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_issues_topic_id      ON issues(topic_id);
CREATE INDEX IF NOT EXISTS idx_motions_issue_id     ON motions(issue_id);
CREATE INDEX IF NOT EXISTS idx_stance_motion_id     ON stance_events(motion_id);
CREATE INDEX IF NOT EXISTS idx_stance_created_at    ON stance_events(created_at DESC);

