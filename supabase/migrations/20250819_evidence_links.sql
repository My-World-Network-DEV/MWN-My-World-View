-- Evidence linking table to associate evidence with any entity type
-- Entities supported: Topic, Issue, Motion, Position, Argument, Debate, Solution
create table if not exists public.evidence_links (
    id uuid primary key default gen_random_uuid(),
    entity_type text not null check (
        entity_type in (
            'Topic',
            'Issue',
            'Motion',
            'Position',
            'Argument',
            'Debate',
            'Solution'
        )
    ),
    entity_id uuid not null,
    evidence_id uuid not null references public.evidence(id) on delete cascade,
    created_by uuid references public.users(id) on delete
    set null,
        created_at timestamptz not null default now(),
        unique(entity_type, entity_id, evidence_id)
);
create index if not exists idx_evidence_links_entity on public.evidence_links(entity_type, entity_id);
create index if not exists idx_evidence_links_evidence on public.evidence_links(evidence_id);
-- Enable RLS and define simple policies (public read, auth insert, owner update/delete)
do $$ begin execute 'alter table public.evidence_links enable row level security';
exception
when others then null;
end $$;
do $$ begin create policy evidence_links_select_public on public.evidence_links for
select using (true);
exception
when duplicate_object then null;
end $$;
do $$ begin create policy evidence_links_insert_auth on public.evidence_links for
insert with check (auth.uid() is not null);
exception
when duplicate_object then null;
end $$;
do $$ begin create policy evidence_links_update_owner on public.evidence_links for
update using (created_by = auth.uid()) with check (created_by = auth.uid());
exception
when duplicate_object then null;
end $$;
do $$ begin create policy evidence_links_delete_owner on public.evidence_links for delete using (created_by = auth.uid());
exception
when duplicate_object then null;
end $$;