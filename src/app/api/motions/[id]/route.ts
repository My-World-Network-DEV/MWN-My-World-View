import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = (await context.params) ?? ({} as { id?: string });
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    return NextResponse.json({
      motion: {
        id,
        title: 'AI will displace more jobs than it creates (by 2035).',
        description: null,
        issue: { id: '101', title: 'AI and Entry-Level Jobs' },
        related: [
          { id: '9003', title: 'Mandate employer-funded reskilling for affected roles' },
          { id: '9004', title: 'Expand apprenticeship pathways in tech-adjacent fields' },
        ],
      },
      mock: true,
    });
  }

  const supabase = createClient(url, anon);

  const { data: motionRow, error: motionErr } = await supabase
    .from('motions')
    .select('id, title, description, issue_id')
    .eq('id', id)
    .maybeSingle();

  if (motionErr) return NextResponse.json({ error: motionErr.message }, { status: 400 });
  if (!motionRow) return NextResponse.json({ error: 'Motion not found' }, { status: 404 });

  const { data: issueRow } = await supabase
    .from('issues')
    .select('id, title')
    .eq('id', motionRow.issue_id)
    .maybeSingle();

  const motion = {
    id: motionRow.id,
    title: motionRow.title,
    description: motionRow.description,
    issue: issueRow ? { id: issueRow.id, title: issueRow.title } : null,
    related: [] as Array<{ id: string; title: string }>,
  };

  return NextResponse.json({ motion });
}


