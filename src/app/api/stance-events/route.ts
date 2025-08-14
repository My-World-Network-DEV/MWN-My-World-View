export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type Body = { motionId?: string; stance?: 'for' | 'against' | 'abstain'; reasonText?: string };

export async function POST(req: Request) {
  const { motionId, stance, reasonText } = (await req.json().catch(() => ({}))) as Body;
  const allowed = new Set(['for', 'against', 'abstain']);

  if (!motionId || !stance || !allowed.has(stance)) {
    return NextResponse.json(
      { error: 'motionId and stance (for|against|abstain) are required' },
      { status: 400 }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // server-only (never NEXT_PUBLIC)
  if (!url || !serviceKey) {
    return NextResponse.json({ error: 'Server misconfigured: missing Supabase env vars' }, { status: 500 });
  }

  const admin = createClient(url, serviceKey);

  const { error } = await admin.from('stance_events').insert({
    motion_id: motionId,
    stance,
    metadata: reasonText ? { reasonText } : {},
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true }, { status: 201 });
}


