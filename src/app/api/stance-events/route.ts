export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type Body = { motionId?: string; stance?: number; privacy?: string; reasonText?: string; evidenceUrls?: string[] };

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Body;
  const motionId = typeof body.motionId === 'string' ? body.motionId : '';
  const stance = typeof body.stance === 'number' ? Math.trunc(body.stance) : NaN;
  const privacy = (typeof body.privacy === 'string' ? body.privacy : 'public') as
    | 'public'
    | 'anonymous'
    | 'hiddenWeighted';
  const reasonText = typeof body.reasonText === 'string' ? body.reasonText : undefined;
  const evidenceUrls = Array.isArray(body.evidenceUrls)
    ? body.evidenceUrls.map((x) => (typeof x === 'string' ? x : '')).filter(Boolean)
    : undefined;

  if (!motionId || !(stance >= 1 && stance <= 5) || !['public', 'anonymous', 'hiddenWeighted'].includes(privacy)) {
    return NextResponse.json(
      { error: 'Invalid body', details: { motionId: !!motionId, stance: stance, privacy } },
      { status: 400 }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // server-only (never NEXT_PUBLIC)
  if (!url || !serviceKey) {
    return NextResponse.json({ error: 'Server misconfigured: missing Supabase env vars' }, { status: 500 });
  }

  const admin = createClient(url, serviceKey);

  const { data, error } = await admin
    .from('stance_events')
    .insert({
      motion_id: motionId,
      stance,
      privacy,
      reason_text: reasonText,
      evidence_urls: evidenceUrls ?? undefined,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({
    id: data?.id,
    motionId,
    stance,
    privacy,
    reasonText,
    evidenceUrls: evidenceUrls ?? [],
    createdAt: data?.created_at ?? null,
  }, { status: 201 });
}


