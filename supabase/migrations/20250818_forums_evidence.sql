-- Forums, Proposals, Votes, and Evidence schema (idempotent where possible)
-- 1) Evidence table (community-driven credibility scoring for MVP)
CREATE TABLE IF NOT EXISTS public.evidence (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url             text,
  title           text,
  domain          text,
  authors         jsonb DEFAULT '[]'::jsonb,
  publish_date    date,
  credibility     smallint CHECK (credibility BETWEEN 1 AND 5),
  source_type     text CHECK (source_type IN ('academic','government','news','expert','personal')),
  created_by      uuid REFERENCES public.users(id) ON DELETE SET NULL,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- Optional link table to arguments or motions later; keep generic for now

-- 2) Forums table
CREATE TABLE IF NOT EXISTS public.forums (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type  text NOT NULL CHECK (entity_type IN ('Topic','Issue','Motion','Position','Debate','Solution')),
  entity_id    uuid NOT NULL,
  created_by   uuid REFERENCES public.users(id) ON DELETE SET NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE(entity_type, entity_id)
);

-- 3) Proposals table (rule proposals within forums)
CREATE TABLE IF NOT EXISTS public.proposals (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  forum_id      uuid NOT NULL REFERENCES public.forums(id) ON DELETE CASCADE,
  title         text NOT NULL,
  description   text,
  voting_type   text NOT NULL CHECK (voting_type IN ('yesno','slider','qv')),
  status        text NOT NULL CHECK (status IN ('proposed','voting','approved','rejected')) DEFAULT 'proposed',
  created_by    uuid REFERENCES public.users(id) ON DELETE SET NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- 4) Votes table (stores votes per proposal)
CREATE TABLE IF NOT EXISTS public.votes (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id    uuid NOT NULL REFERENCES public.proposals(id) ON DELETE CASCADE,
  user_id        uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  vote_value     jsonb NOT NULL, -- {"yes":true} or {"slider":3} or {"qv": {"credits":4}}
  created_at     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (proposal_id, user_id)
);

-- 5) Helpful indexes
CREATE INDEX IF NOT EXISTS idx_forums_entity ON public.forums(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_proposals_forum ON public.proposals(forum_id);
CREATE INDEX IF NOT EXISTS idx_votes_proposal ON public.votes(proposal_id);

-- 6) Basic RLS scaffolding (enable; policies can be refined later)
DO $$ BEGIN
  EXECUTE 'ALTER TABLE public.forums ENABLE ROW LEVEL SECURITY';
  EXCEPTION WHEN others THEN NULL;
END $$;
DO $$ BEGIN
  EXECUTE 'ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY';
  EXCEPTION WHEN others THEN NULL;
END $$;
DO $$ BEGIN
  EXECUTE 'ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY';
  EXCEPTION WHEN others THEN NULL;
END $$;
DO $$ BEGIN
  EXECUTE 'ALTER TABLE public.evidence ENABLE ROW LEVEL SECURITY';
  EXCEPTION WHEN others THEN NULL;
END $$;

-- Public read policies (can be tightened later per entity membership)
DO $$ BEGIN
  CREATE POLICY forums_select_public ON public.forums FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY proposals_select_public ON public.proposals FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY votes_select_own_or_public ON public.votes FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY evidence_select_public ON public.evidence FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Insert policies (authenticated users)
DO $$ BEGIN
  CREATE POLICY forums_insert_auth ON public.forums FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY proposals_insert_auth ON public.proposals FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY votes_insert_auth ON public.votes FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY evidence_insert_auth ON public.evidence FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Update/Delete policies (owners or moderators - simplified for MVP to owner-only)
DO $$ BEGIN
  CREATE POLICY proposals_update_owner ON public.proposals FOR UPDATE USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY proposals_delete_owner ON public.proposals FOR DELETE USING (created_by = auth.uid());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY evidence_update_owner ON public.evidence FOR UPDATE USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY evidence_delete_owner ON public.evidence FOR DELETE USING (created_by = auth.uid());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


