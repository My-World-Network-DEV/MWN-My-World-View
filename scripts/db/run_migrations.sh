#!/usr/bin/env bash
set -e
psql "$SUPABASE_DB_URL" -f supabase/migrations/20250813080000_init_core.sql
