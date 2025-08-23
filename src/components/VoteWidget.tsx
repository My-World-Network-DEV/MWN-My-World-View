'use client';

import { useState } from 'react';

export default function VoteWidget({ proposalId, votingType }: { proposalId: string; votingType: 'yesno' | 'slider' | 'qv' }) {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [value, setValue] = useState<any>(votingType === 'yesno' ? false : votingType === 'slider' ? 3 : { credits: 1 });

    const submit = async () => {
        setSubmitting(true);
        setError(null);
        try {
            const voteValue = votingType === 'yesno' ? { yes: !!value } : votingType === 'slider' ? { slider: Number(value) } : { qv: { credits: Number((value as any).credits ?? 1) } };
            const res = await fetch('/api/votes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ proposalId, voteValue }) });
            if (!res.ok) throw new Error((await res.json()).error ?? 'Failed to vote');
        } catch (e: any) {
            setError(e?.message ?? 'Failed to vote');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="rounded border p-3">
            {votingType === 'yesno' && (
                <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1 text-sm"><input type="radio" checked={!!value === true} onChange={() => setValue(true)} />Yes</label>
                    <label className="inline-flex items-center gap-1 text-sm"><input type="radio" checked={!!value === false} onChange={() => setValue(false)} />No</label>
                </div>
            )}
            {votingType === 'slider' && (
                <div className="flex items-center gap-2 text-sm">
                    <input type="range" min={1} max={5} value={Number(value)} onChange={(e) => setValue(Number(e.target.value))} />
                    <span>{value}</span>
                </div>
            )}
            {votingType === 'qv' && (
                <div className="flex items-center gap-2 text-sm">
                    <label>Credits</label>
                    <input className="w-20 rounded border px-2 py-1" type="number" min={1} max={25} value={(value as any).credits ?? 1} onChange={(e) => setValue({ credits: Number(e.target.value) })} />
                </div>
            )}
            <div className="mt-2 flex items-center gap-2">
                <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white" disabled={submitting} onClick={submit}>{submitting ? 'Submitting…' : 'Submit vote'}</button>
                {error ? <span className="text-xs text-rose-600">{error}</span> : null}
            </div>
        </div>
    );
}


