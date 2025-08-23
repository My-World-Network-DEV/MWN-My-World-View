export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type VoteBody = { proposalId?: string; voteValue?: any };

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as VoteBody;
  const proposalId = typeof body.proposalId === 'string' ? body.proposalId : '';
  const voteValue = body.voteValue;
  if (!proposalId || voteValue === undefined || voteValue === null) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }
  const admin = createClient(url, serviceKey);

  const { data, error } = await admin
    .from('votes')
    .insert({ proposal_id: proposalId, vote_value: voteValue })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ id: data?.id, proposalId, voteValue }, { status: 201 });
}


