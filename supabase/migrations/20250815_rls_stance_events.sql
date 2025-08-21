-- Enable RLS and define stance_events policies
ALTER TABLE public.stance_events ENABLE ROW LEVEL SECURITY;
-- Drop existing policies if re-running
DO $$ BEGIN IF EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
        AND tablename = 'stance_events'
        AND policyname = 'stance_events_select_public'
) THEN DROP POLICY stance_events_select_public ON public.stance_events;
END IF;
IF EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
        AND tablename = 'stance_events'
        AND policyname = 'stance_events_insert_auth'
) THEN DROP POLICY stance_events_insert_auth ON public.stance_events;
END IF;
IF EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
        AND tablename = 'stance_events'
        AND policyname = 'stance_events_block_update_delete'
) THEN DROP POLICY stance_events_block_update_delete ON public.stance_events;
END IF;
END $$;
-- Public can SELECT all rows (aggregations happen client/server-side). Consider tightening later.
CREATE POLICY stance_events_select_public ON public.stance_events FOR
SELECT TO public USING (true);
-- Only authenticated users can INSERT their stance events
CREATE POLICY stance_events_insert_auth ON public.stance_events FOR
INSERT TO authenticated WITH CHECK (true);
-- Block UPDATE/DELETE by omitting policies (no policy => denied)
-- Ensure table is in realtime publication (idempotent)
DO $$ BEGIN PERFORM 1
FROM pg_publication_tables
WHERE pubname = 'supabase_realtime'
    AND schemaname = 'public'
    AND tablename = 'stance_events';
IF NOT FOUND THEN ALTER PUBLICATION supabase_realtime
ADD TABLE public.stance_events;
END IF;
END $$;