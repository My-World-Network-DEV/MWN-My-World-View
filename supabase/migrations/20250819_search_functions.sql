-- Simple FTS search functions for topics, issues, motions, evidence
create or replace function public.mwv_search_topics(query text) returns setof topics language sql stable as $$
select *
from topics
where to_tsvector(
        'english',
        coalesce(title, '') || ' ' || coalesce(description, '')
    ) @@ plainto_tsquery('english', query)
order by created_at desc
limit 20;
$$;
create or replace function public.mwv_search_issues(query text) returns setof issues language sql stable as $$
select *
from issues
where to_tsvector(
        'english',
        coalesce(title, '') || ' ' || coalesce(description, '')
    ) @@ plainto_tsquery('english', query)
order by created_at desc
limit 20;
$$;
create or replace function public.mwv_search_motions(query text) returns setof motions language sql stable as $$
select *
from motions
where to_tsvector(
        'english',
        coalesce(title, '') || ' ' || coalesce(description, '')
    ) @@ plainto_tsquery('english', query)
order by created_at desc
limit 20;
$$;
create or replace function public.mwv_search_evidence(query text) returns setof evidence language sql stable as $$
select *
from evidence
where to_tsvector(
        'english',
        coalesce(title, '') || ' ' || coalesce(domain, '') || ' ' || coalesce(url, '')
    ) @@ plainto_tsquery('english', query)
order by created_at desc
limit 20;
$$;