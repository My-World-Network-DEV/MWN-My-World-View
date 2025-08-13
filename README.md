# My World View (MWV) — Starter scaffold

Short: topic→issue→motion debate platform.

## Quickstart

1. git clone <repo> && cd MWN-My-World-View
2. pnpm install
3. cp .env.example .env.local (set VERCEL, SUPABASE keys)
4. pnpm dev

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase

## Dev notes

Supabase migrations live in `supabase/migrations`. Run `scripts/db/run_migrations.sh` to apply.
