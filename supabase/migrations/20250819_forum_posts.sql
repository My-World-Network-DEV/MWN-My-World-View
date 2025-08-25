-- Forum posts with simple threaded structure
create table if not exists public.forum_posts (
    id uuid primary key default gen_random_uuid(),
    forum_id uuid not null references public.forums(id) on delete cascade,
    parent_id uuid references public.forum_posts(id) on delete cascade,
    body text not null,
    created_by uuid references public.users(id) on delete
    set null,
        created_at timestamptz not null default now()
);
create index if not exists idx_forum_posts_forum on public.forum_posts(forum_id, created_at desc);
create index if not exists idx_forum_posts_parent on public.forum_posts(parent_id);
do $$ begin execute 'alter table public.forum_posts enable row level security';
exception
when others then null;
end $$;
do $$ begin create policy forum_posts_select_public on public.forum_posts for
select using (true);
exception
when duplicate_object then null;
end $$;
do $$ begin create policy forum_posts_insert_auth on public.forum_posts for
insert with check (auth.uid() is not null);
exception
when duplicate_object then null;
end $$;
do $$ begin create policy forum_posts_update_owner on public.forum_posts for
update using (created_by = auth.uid()) with check (created_by = auth.uid());
exception
when duplicate_object then null;
end $$;
do $$ begin create policy forum_posts_delete_owner on public.forum_posts for delete using (created_by = auth.uid());
exception
when duplicate_object then null;
end $$;