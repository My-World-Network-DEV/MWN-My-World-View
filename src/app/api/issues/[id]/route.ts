import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(_: Request, context: any) {
  const { id } = context?.params ?? {};
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    return NextResponse.json({
      issue: { id, title: 'AI and Entry-Level Jobs', description: 'Seeded issue' },
      motions: [
        { id: '9001', title: 'Governments should fund AI job retraining credits for young workers.' },
        { id: '9002', title: 'Introduce apprenticeship tax offsets for employers hiring displaced workers.' },
      ],
      mock: true,
    });
  }

  const supabase = createClient(url, anon);
  const { data: issueRow, error: issueErr } = await supabase.from('issues').select('id,title,description').eq('id', id).maybeSingle();
  if (issueErr) return NextResponse.json({ error: issueErr.message }, { status: 400 });
  if (!issueRow) return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

  const { data: motions, error: motionsErr } = await supabase
    .from('motions')
    .select('id,title')
    .eq('issue_id', id)
    .order('created_at', { ascending: false })
    .limit(20);
  if (motionsErr) return NextResponse.json({ error: motionsErr.message }, { status: 400 });

  return NextResponse.json({ issue: issueRow, motions: motions ?? [] });
}


