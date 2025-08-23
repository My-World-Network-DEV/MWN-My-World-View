export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type ProposalBody = { forumId?: string; title?: string; description?: string; votingType?: 'yesno' | 'slider' | 'qv' };

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as ProposalBody;
  const forumId = typeof body.forumId === 'string' ? body.forumId : '';
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const description = typeof body.description === 'string' ? body.description : undefined;
  const votingType = body.votingType;
  if (!forumId || !title || !votingType || !['yesno', 'slider', 'qv'].includes(votingType)) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }
  const admin = createClient(url, serviceKey);

  const { data, error } = await admin
    .from('proposals')
    .insert({ forum_id: forumId, title, description, voting_type: votingType })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ id: data?.id, forumId, title, votingType }, { status: 201 });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const forumId = searchParams.get('forumId') || undefined;
  const status = searchParams.get('status') || undefined;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }
  const admin = createClient(url, serviceKey);

  let query = admin.from('proposals').select('*');
  if (forumId) query = query.eq('forum_id', forumId);
  if (status) query = query.eq('status', status);
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ proposals: data ?? [] }, { status: 200 });
}


