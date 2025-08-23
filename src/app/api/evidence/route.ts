export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  const admin = createClient(url, serviceKey);
  const { data, error } = await admin.from('evidence').select('*').order('created_at', { ascending: false }).limit(50);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ evidence: data ?? [] }, { status: 200 });
}

export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  const admin = createClient(url, serviceKey);
  const body = await req.json().catch(() => ({})) as { url?: string; title?: string; sourceType?: string; credibility?: number };
  const payload: any = {
    url: typeof body.url === 'string' ? body.url : null,
    title: typeof body.title === 'string' ? body.title : null,
    source_type: typeof body.sourceType === 'string' ? body.sourceType : null,
    credibility: typeof body.credibility === 'number' ? Math.trunc(body.credibility) : null,
  };
  const { data, error } = await admin.from('evidence').insert(payload).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ id: data?.id }, { status: 201 });
}


