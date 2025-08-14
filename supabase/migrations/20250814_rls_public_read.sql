-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE motions ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE stance_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE census_snapshots ENABLE ROW LEVEL SECURITY;
-- Public read policies (idempotent)
DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'topics'
        AND policyname = 'Public read'
) THEN CREATE POLICY "Public read" ON topics FOR
SELECT USING (true);
END IF;
IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'issues'
        AND policyname = 'Public read'
) THEN CREATE POLICY "Public read" ON issues FOR
SELECT USING (true);
END IF;
IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'motions'
        AND policyname = 'Public read'
) THEN CREATE POLICY "Public read" ON motions FOR
SELECT USING (true);
END IF;
IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'posts'
        AND policyname = 'Public read'
) THEN CREATE POLICY "Public read" ON posts FOR
SELECT USING (true);
END IF;
IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'stance_events'
        AND policyname = 'Public read'
) THEN CREATE POLICY "Public read" ON stance_events FOR
SELECT USING (true);
END IF;
IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'census_snapshots'
        AND policyname = 'Public read'
) THEN CREATE POLICY "Public read" ON census_snapshots FOR
SELECT USING (true);
END IF;
END $$;