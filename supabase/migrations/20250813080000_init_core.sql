-- Core schema for My World View (initial migration)

-- Enable uuid generation extension if not present
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- users
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  display_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- topics
CREATE TABLE IF NOT EXISTS topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE,
  title text NOT NULL,
  description text,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- issues
CREATE TABLE IF NOT EXISTS issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid REFERENCES topics(id),
  title text NOT NULL,
  description text,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- motions
CREATE TABLE IF NOT EXISTS motions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id uuid REFERENCES issues(id),
  title text NOT NULL,
  description text,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- posts (general micro-posts)
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  content text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- stance_events
CREATE TABLE IF NOT EXISTS stance_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  motion_id uuid REFERENCES motions(id),
  stance text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- census_snapshots (rollups)
CREATE TABLE IF NOT EXISTS census_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  motion_id uuid REFERENCES motions(id),
  total_count bigint DEFAULT 0,
  counts jsonb DEFAULT '{}'::jsonb,
  snapshot_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_motions_issue_id ON motions(issue_id);
CREATE INDEX IF NOT EXISTS idx_stance_motion_id ON stance_events(motion_id);
