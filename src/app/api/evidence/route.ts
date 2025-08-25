export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  const admin = createClient(url, serviceKey);
  const { searchParams } = new URL(req.url);
  const entityType = searchParams.get('entityType');
  const entityId = searchParams.get('entityId');

  if (entityType && entityId) {
    const { data, error } = await admin
      .from('evidence_links')
      .select('evidence: evidence_id ( id, url, title, domain, credibility, source_type, created_at )')
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    const evidence = (data ?? []).map((row: any) => row.evidence).filter(Boolean);
    return NextResponse.json({ evidence }, { status: 200 });
  }

  const { data, error } = await admin.from('evidence').select('*').order('created_at', { ascending: false }).limit(50);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ evidence: data ?? [] }, { status: 200 });
}

export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  const admin = createClient(url, serviceKey);
  const body = await req.json().catch(() => ({})) as { url?: string; title?: string; sourceType?: string; credibility?: number; entityType?: string; entityId?: string; evidenceId?: string };

  const entityType = typeof body.entityType === 'string' ? body.entityType : undefined;
  const entityId = typeof body.entityId === 'string' ? body.entityId : undefined;
  const providedEvidenceId = typeof body.evidenceId === 'string' ? body.evidenceId : undefined;

  let evId = providedEvidenceId ?? '';

  if (!evId) {
    const payload: any = {
      url: typeof body.url === 'string' ? body.url : null,
      title: typeof body.title === 'string' ? body.title : null,
      source_type: typeof body.sourceType === 'string' ? body.sourceType : null,
      credibility: typeof body.credibility === 'number' ? Math.trunc(body.credibility) : null,
    };
    const { data, error } = await admin.from('evidence').insert(payload).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    evId = data?.id as string;
  }

  if (entityType && entityId && evId) {
    const { error: linkError } = await admin.from('evidence_links').insert({ entity_type: entityType, entity_id: entityId, evidence_id: evId });
    if (linkError && !linkError.message.includes('duplicate')) {
      return NextResponse.json({ error: linkError.message }, { status: 400 });
    }
  }

  return NextResponse.json({ id: evId }, { status: 201 });
}


