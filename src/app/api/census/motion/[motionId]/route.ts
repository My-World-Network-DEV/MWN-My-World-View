/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(_: Request, context: any) {
  const { motionId } = context?.params ?? {};
  if (!motionId) return NextResponse.json({ error: 'motionId required' }, { status: 400 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    return NextResponse.json({
      motionId,
      total: 0,
      counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      percentages: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      mock: true,
    });
  }

  const supabase = createClient(url, anon);

  const { data, error } = await supabase
    .from('stance_events')
    .select('stance')
    .eq('motion_id', motionId);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const row of data ?? []) {
    const s = Number((row as any).stance) as 1 | 2 | 3 | 4 | 5;
    if (s >= 1 && s <= 5) counts[s] += 1;
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const percentages = Object.fromEntries(
    Object.entries(counts).map(([k, v]) => [k, total > 0 ? Math.round((Number(v) / total) * 100) : 0])
  );

  const res = NextResponse.json({ motionId, total, counts, percentages });
  res.headers.set('Cache-Control', 'no-store');
  return res;
}


