-- supabase/seed.sql
BEGIN;
WITH u AS (
    INSERT INTO users (email, display_name)
    VALUES ('demo@example.com', 'Demo User') ON CONFLICT (email) DO
    UPDATE
    SET display_name = EXCLUDED.display_name
    RETURNING id AS user_id
),
t AS (
    INSERT INTO topics (slug, title, description, created_by)
    SELECT 'ai',
        'Artificial Intelligence',
        'Seeded topic',
        user_id
    FROM u ON CONFLICT (slug) DO
    UPDATE
    SET title = EXCLUDED.title,
        description = EXCLUDED.description
    RETURNING id AS topic_id,
        created_by
),
i AS (
    INSERT INTO issues (topic_id, title, description, created_by)
    SELECT topic_id,
        'Does AI harm jobs?',
        'Seeded issue',
        created_by
    FROM t
    RETURNING id AS issue_id,
        created_by
),
m AS (
    INSERT INTO motions (issue_id, title, description, created_by)
    SELECT issue_id,
        'AI will displace more jobs than it creates (by 2035)',
        'Seeded motion',
        created_by
    FROM i
    RETURNING id AS motion_id
)
INSERT INTO stance_events (user_id, motion_id, stance, metadata, privacy)
SELECT (
        SELECT user_id
        FROM u
    ),
    motion_id,
    s.stance,
    '{}'::jsonb,
    s.privacy
FROM m,
    LATERAL (
        VALUES (5, 'public'),
            (5, 'public'),
            (4, 'anonymous'),
            (3, 'hiddenWeighted'),
            (2, 'public'),
            (1, 'anonymous')
    ) AS s(stance, privacy);
COMMIT;