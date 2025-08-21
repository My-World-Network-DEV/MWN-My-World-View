-- Migrate stance_events to 1–5 schema with privacy, reason_text, evidence_urls and helpful indexes
-- 1) Create enum for privacy if missing
DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'privacy_level'
) THEN CREATE TYPE privacy_level AS ENUM ('public', 'anonymous', 'hiddenWeighted');
END IF;
END $$;
-- 2) Ensure columns exist and convert stance to smallint with 1..5 constraint
ALTER TABLE public.stance_events
ADD COLUMN IF NOT EXISTS reason_text text,
    ADD COLUMN IF NOT EXISTS evidence_urls jsonb NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS privacy privacy_level NOT NULL DEFAULT 'public';
-- If stance is text, add a temporary smallint column and migrate data
DO $$ BEGIN IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
        AND table_name = 'stance_events'
        AND column_name = 'stance'
        AND data_type = 'text'
) THEN
ALTER TABLE public.stance_events
ADD COLUMN stance_int smallint;
UPDATE public.stance_events
SET stance_int = (
        CASE
            WHEN stance = 'for' THEN 5
            WHEN stance = 'against' THEN 1
            WHEN stance = 'abstain' THEN 3
            WHEN stance ~ '^[0-9]+$' THEN LEAST(GREATEST(1, stance::int), 5)
            ELSE 3
        END
    );
ALTER TABLE public.stance_events DROP COLUMN stance;
ALTER TABLE public.stance_events
    RENAME COLUMN stance_int TO stance;
END IF;
END $$;
-- Add check constraint (idempotent)
DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM information_schema.constraint_column_usage
    WHERE table_schema = 'public'
        AND table_name = 'stance_events'
        AND constraint_name = 'stance_events_stance_check'
) THEN
ALTER TABLE public.stance_events
ADD CONSTRAINT stance_events_stance_check CHECK (
        stance BETWEEN 1 AND 5
    );
END IF;
END $$;
-- 3) Helpful indexes
CREATE INDEX IF NOT EXISTS idx_stance_events_motion_id ON public.stance_events(motion_id);
CREATE INDEX IF NOT EXISTS idx_stance_events_created_at ON public.stance_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_stance_events_motion_stance ON public.stance_events(motion_id, stance);