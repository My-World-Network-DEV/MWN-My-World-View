export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, ctx: Params) {
  const { id } = await ctx.params;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  const admin = createClient(url, serviceKey);
  const { data, error } = await admin
    .from('forum_posts')
    .select('id, forum_id, parent_id, body, created_by, created_at')
    .eq('forum_id', id)
    .order('created_at', { ascending: true })
    .limit(500);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ posts: data ?? [] });
}

export async function POST(req: Request, ctx: Params) {
  const { id } = await ctx.params;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  const admin = createClient(url, serviceKey);
  const body = (await req.json().catch(() => ({}))) as { parentId?: string; body?: string };
  const payload: any = { forum_id: id, parent_id: typeof body.parentId === 'string' ? body.parentId : null, body: typeof body.body === 'string' ? body.body : null };
  if (!payload.body) return NextResponse.json({ error: 'Missing body' }, { status: 400 });
  const { data, error } = await admin.from('forum_posts').insert(payload).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ id: data?.id }, { status: 201 });
}


