'use client';

import { useState } from 'react';

type Props = { onSubmit?: (v: { title: string; description: string; votingType: 'yesno' | 'slider' | 'qv' }) => void };

export default function ProposalForm({ onSubmit }: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [votingType, setVotingType] = useState<'yesno' | 'slider' | 'qv'>('yesno');
    const handleSubmit = onSubmit ?? (() => { });

    return (
        <form
            className="rounded-lg border bg-white p-4 space-y-3"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit({ title, description, votingType });
            }}
        >
            <div>
                <label className="block text-sm font-medium">Title</label>
                <input className="mt-1 w-full rounded border px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea className="mt-1 w-full rounded border px-3 py-2" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium">Voting Type</label>
                <select className="mt-1 w-full rounded border px-3 py-2" value={votingType} onChange={(e) => setVotingType(e.target.value as any)}>
                    <option value="yesno">Yes / No</option>
                    <option value="slider">1–5 Slider</option>
                    <option value="qv">Quadratic Voting</option>
                </select>
            </div>
            <button className="rounded bg-blue-600 px-3 py-2 text-sm text-white" type="submit">
                Submit Proposal
            </button>
        </form>
    );
}


