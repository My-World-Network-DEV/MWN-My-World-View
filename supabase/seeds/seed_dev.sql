-- Core schema for My World View (initial migration)
-- 0) UUIDs (needed for gen_random_uuid())
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
-- provides gen_random_uuid() v4  ✔
-- 1) users
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  display_name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
-- 2) topics
CREATE TABLE IF NOT EXISTS topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  created_by uuid REFERENCES users(id) ON DELETE
  SET NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);
-- 3) issues
CREATE TABLE IF NOT EXISTS issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  created_by uuid REFERENCES users(id) ON DELETE
  SET NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);
-- 4) motions
CREATE TABLE IF NOT EXISTS motions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id uuid NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  created_by uuid REFERENCES users(id) ON DELETE
  SET NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);
-- 5) posts (general micro-posts)
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE
  SET NULL,
    content text NOT NULL,
    metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now()
);
-- 6) stance_events (append-only)
--    Keeping your original text stance (for/against/abstain) but validating it.
CREATE TABLE IF NOT EXISTS stance_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE
  SET NULL,
    -- nullable now; require auth via RLS later
    motion_id uuid NOT NULL REFERENCES motions(id) ON DELETE CASCADE,
    stance text NOT NULL CHECK (stance IN ('for', 'against', 'abstain')),
    reason_text text,
    metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now()
);
-- 7) census_snapshots (rollups – optional, raw counts now; weighted later)
CREATE TABLE IF NOT EXISTS census_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  motion_id uuid NOT NULL REFERENCES motions(id) ON DELETE CASCADE,
  total_count bigint NOT NULL DEFAULT 0,
  counts jsonb NOT NULL DEFAULT '{}'::jsonb,
  -- e.g. {"for":12,"against":8,"abstain":3}
  snapshot_at timestamptz NOT NULL DEFAULT now()
);
-- 8) helpful indexes
CREATE INDEX IF NOT EXISTS idx_topics_slug ON topics(slug);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_issues_topic_id ON issues(topic_id);
CREATE INDEX IF NOT EXISTS idx_motions_issue_id ON motions(issue_id);
CREATE INDEX IF NOT EXISTS idx_stance_motion_id ON stance_events(motion_id);
CREATE INDEX IF NOT EXISTS idx_stance_created_at ON stance_events(created_at DESC);
-- Governance + Evidence seed (idempotent-ish)
DO $$
DECLARE t_id uuid;
i_id uuid;
m_id uuid;
f_id uuid;
u_id uuid;
ev_id uuid;
BEGIN -- ensure a demo user
SELECT id INTO u_id
FROM users
LIMIT 1;
IF u_id IS NULL THEN
INSERT INTO users (email, display_name)
VALUES ('demo@example.com', 'Demo User')
RETURNING id INTO u_id;
END IF;
-- ensure a topic
SELECT id INTO t_id
FROM topics
WHERE slug = 'climate'
LIMIT 1;
IF t_id IS NULL THEN
INSERT INTO topics (slug, title, description, created_by)
VALUES (
    'climate',
    'Climate Change',
    'Debates around climate policy',
    u_id
  )
RETURNING id INTO t_id;
END IF;
-- ensure an issue
SELECT id INTO i_id
FROM issues
WHERE topic_id = t_id
LIMIT 1;
IF i_id IS NULL THEN
INSERT INTO issues (topic_id, title, description, created_by)
VALUES (
    t_id,
    'Carbon Neutrality by 2030',
    'Pathways to neutrality',
    u_id
  )
RETURNING id INTO i_id;
END IF;
-- ensure a motion
SELECT id INTO m_id
FROM motions
WHERE issue_id = i_id
LIMIT 1;
IF m_id IS NULL THEN
INSERT INTO motions (issue_id, title, description, created_by)
VALUES (
    i_id,
    'City should ban single-use plastics',
    'Policy to reduce plastic waste',
    u_id
  )
RETURNING id INTO m_id;
END IF;
-- ensure forum for the motion
PERFORM 1
FROM forums
WHERE entity_type = 'Motion'
  AND entity_id = m_id;
IF NOT FOUND THEN
INSERT INTO forums (entity_type, entity_id, created_by)
VALUES ('Motion', m_id, u_id)
RETURNING id INTO f_id;
ELSE
SELECT id INTO f_id
FROM forums
WHERE entity_type = 'Motion'
  AND entity_id = m_id
LIMIT 1;
END IF;
-- seed a proposal
PERFORM 1
FROM proposals
WHERE forum_id = f_id;
IF NOT FOUND THEN
INSERT INTO proposals (
    forum_id,
    title,
    description,
    voting_type,
    status,
    created_by
  )
VALUES (
    f_id,
    'Stance change cooldown',
    'Limit how often users can change stance to reduce brigading',
    'slider',
    'proposed',
    u_id
  );
END IF;
-- seed evidence
PERFORM 1
FROM evidence
WHERE url = 'https://www.un.org/en/climatechange';
IF NOT FOUND THEN
INSERT INTO evidence (
    url,
    title,
    domain,
    authors,
    credibility,
    source_type,
    created_by
  )
VALUES (
    'https://www.un.org/en/climatechange',
    'UN Climate Change Overview',
    'un.org',
    '["UN Secretariat"]'::jsonb,
    5,
    'government',
    u_id
  );
END IF;
-- link the seeded evidence to the demo motion
SELECT id INTO ev_id
FROM evidence
WHERE url = 'https://www.un.org/en/climatechange'
LIMIT 1;
IF ev_id IS NOT NULL THEN PERFORM 1
FROM evidence_links
WHERE entity_type = 'Motion'
  AND entity_id = m_id
  AND evidence_id = ev_id;
IF NOT FOUND THEN
INSERT INTO evidence_links (entity_type, entity_id, evidence_id, created_by)
VALUES ('Motion', m_id, ev_id, u_id);
END IF;
END IF;
END $$;