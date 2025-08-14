export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(_: Request, context: any) {
  const { motionId } = context?.params ?? {};
  if (!motionId) return NextResponse.json({ error: 'motionId required' }, { status: 400 });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('stance_events')
    .select('stance')
    .eq('motion_id', motionId);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const counts = { for: 0, against: 0, abstain: 0 };
  for (const row of data ?? []) {
    const k = (row as any).stance as keyof typeof counts;
    if (k in counts) counts[k] += 1;
  }
  const total = counts.for + counts.against + counts.abstain;

  return NextResponse.json({ motionId, total, counts });
}


