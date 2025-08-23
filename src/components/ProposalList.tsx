'use client';

import { useEffect, useState } from 'react';

type Proposal = { id: string; title: string; description: string | null; voting_type: 'yesno' | 'slider' | 'qv'; status: string };
import VoteWidget from './VoteWidget';

export default function ProposalList({ forumId }: { forumId: string }) {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api/proposals?forumId=${forumId}`, { cache: 'no-store' });
                if (!res.ok) throw new Error('Failed to load proposals');
                const data = (await res.json()) as { proposals: Proposal[] };
                if (!cancelled) setProposals(data.proposals ?? []);
            } catch (e: any) {
                if (!cancelled) setError(e?.message ?? 'Failed to load proposals');
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [forumId]);

    if (loading) return <div className="text-sm text-gray-600">Loading proposals…</div>;
    if (error) return <div className="text-sm text-rose-600">{error}</div>;

    if (proposals.length === 0) return <div className="text-sm text-gray-600">No proposals yet.</div>;

    return (
        <ul className="space-y-3">
            {proposals.map((p) => (
                <li key={p.id} className="rounded border bg-white p-3">
                    <div className="flex items-center justify-between">
                        <div className="font-medium">{p.title}</div>
                        <span className="text-xs rounded border px-2 py-0.5">{p.voting_type}</span>
                    </div>
                    {p.description ? <p className="mt-1 text-sm text-gray-700">{p.description}</p> : null}
                    <div className="mt-2 text-xs text-gray-600">Status: {p.status}</div>
                    <div className="mt-3">
                        <VoteWidget proposalId={p.id} votingType={p.voting_type} />
                    </div>
                </li>
            ))}
        </ul>
    );
}


