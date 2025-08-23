export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type ForumBody = { entityType?: string; entityId?: string };

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as ForumBody;
  const entityType = typeof body.entityType === 'string' ? body.entityType : '';
  const entityId = typeof body.entityId === 'string' ? body.entityId : '';
  const allowed = ['Topic', 'Issue', 'Motion', 'Position', 'Debate', 'Solution'];
  if (!entityType || !entityId || !allowed.includes(entityType)) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }
  const admin = createClient(url, serviceKey);

  const { data, error } = await admin
    .from('forums')
    .insert({ entity_type: entityType, entity_id: entityId })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ id: data?.id, entityType, entityId }, { status: 201 });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const entityType = searchParams.get('entityType') || undefined;
  const entityId = searchParams.get('entityId') || undefined;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }
  const admin = createClient(url, serviceKey);

  let query = admin.from('forums').select('*');
  if (entityType) query = query.eq('entity_type', entityType);
  if (entityId) query = query.eq('entity_id', entityId);
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ forums: data ?? [] }, { status: 200 });
}


