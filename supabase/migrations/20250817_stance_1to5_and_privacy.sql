-- Migrate stance_events.stance from text ('for'|'against'|'abstain') to int (1..5)
-- and add privacy with allowed values.
begin;
-- Map existing text stances to integers: against=1, abstain=3, for=5
alter table public.stance_events
alter column stance type int using (
        case
            when stance::text = 'against' then 1
            when stance::text = 'abstain' then 3
            when stance::text = 'for' then 5
            when stance ~ '^[0-9]+$' then stance::int
            else 3
        end
    );
alter table public.stance_events
add constraint stance_events_stance_check check (
        stance between 1 and 5
    );
-- Add privacy column with allowed values
alter table public.stance_events
add column if not exists privacy text not null default 'public';
alter table public.stance_events
add constraint stance_events_privacy_check check (
        privacy in ('public', 'anonymous', 'hiddenWeighted')
    );
-- Ensure at most one stance per (user_id,motion_id) when user is known
do $$ begin if not exists (
    select 1
    from pg_indexes
    where schemaname = 'public'
        and indexname = 'uniq_stance_user_motion'
) then create unique index uniq_stance_user_motion on public.stance_events (user_id, motion_id)
where user_id is not null;
end if;
end $$;
commit;