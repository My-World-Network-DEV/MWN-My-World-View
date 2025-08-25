export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  const admin = createClient(url, serviceKey);
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') ?? '').trim();
  if (!q) return NextResponse.json({ topics: [], issues: [], motions: [], evidence: [] }, { status: 200 });

  // Basic FTS using plainto_tsquery on title/description/url/title
  const tsQuery = q.replace(/[':]/g, ' ');

  const [topics, issues, motions, evidence] = await Promise.all([
    admin.rpc('mwv_search_topics', { query: tsQuery }).then((r) => (r.error ? [] : r.data ?? [])),
    admin.rpc('mwv_search_issues', { query: tsQuery }).then((r) => (r.error ? [] : r.data ?? [])),
    admin.rpc('mwv_search_motions', { query: tsQuery }).then((r) => (r.error ? [] : r.data ?? [])),
    admin.rpc('mwv_search_evidence', { query: tsQuery }).then((r) => (r.error ? [] : r.data ?? [])),
  ]);

  return NextResponse.json({ topics, issues, motions, evidence });
}


