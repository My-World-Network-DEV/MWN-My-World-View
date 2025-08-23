# My World View (MWV) — Starter scaffold

Short: topic→issue→motion debate platform.

## Quickstart

1. git clone "repo" && cd MWN-My-World-View
2. pnpm install
3. cp .env.example .env.local (set VERCEL, SUPABASE keys)
4. pnpm dev

## Environment

Create a `.env.local` with:

NEXT_PUBLIC_SUPABASE_URL=  # Supabase Dashboard → Settings → API → Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Supabase Dashboard → Settings → API → anon public key
SUPABASE_SERVICE_ROLE_KEY=  # server-only, from Settings → API (NEVER expose as NEXT_PUBLIC)

## API quick test

1) Seed data: paste the contents of `supabase/seed.sql` into Supabase SQL Editor and run
2) Find a motion id from the inserted motion
3) Check counts (replace MOTION_ID)
<http://localhost:3000/api/census/motion/MOTION_ID>

4) Add a stance (PowerShell caret escapes)

curl -X POST <http://localhost:3000/api/stance-events> ^
  -H "Content-Type: application/json" ^
  -d "{\"motionId\":\"MOTION_ID\",\"stance\":\"for\"}"

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase

## Dev notes

Supabase migrations live in `supabase/migrations`. Run `scripts/db/run_migrations.sh` to apply.
