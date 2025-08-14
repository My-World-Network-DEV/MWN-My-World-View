DO $$ BEGIN PERFORM 1
FROM pg_publication_tables
WHERE pubname = 'supabase_realtime'
    AND schemaname = 'public'
    AND tablename = 'stance_events';
IF NOT FOUND THEN ALTER PUBLICATION supabase_realtime
ADD TABLE public.stance_events;
END IF;
END $$;