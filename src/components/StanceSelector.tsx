'use client';

import { useState } from 'react';

type Props = { onSubmit: (v: { stance: 1 | 2 | 3 | 4 | 5; privacy: 'public' | 'anonymous' }) => void };

export default function StanceSelector({ onSubmit }: Props) {
    const [stance, setStance] = useState<1 | 2 | 3 | 4 | 5>(3);
    const [privacy, setPrivacy] = useState<'public' | 'anonymous'>('public');
    return (
        <form
            className="rounded border bg-white p-4 space-y-3"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ stance, privacy });
            }}
        >
            <div>
                <label className="text-sm font-medium">Stance: {stance}</label>
                <input className="mt-1 w-full" type="range" min={1} max={5} value={stance} onChange={(e) => setStance(Number(e.target.value) as any)} />
            </div>
            <div>
                <label className="text-sm font-medium">Privacy</label>
                <select className="mt-1 w-full rounded border px-3 py-2" value={privacy} onChange={(e) => setPrivacy(e.target.value as any)}>
                    <option value="public">Public</option>
                    <option value="anonymous">Anonymous</option>
                </select>
            </div>
            <button className="rounded bg-emerald-600 px-3 py-2 text-sm text-white" type="submit">Submit</button>
        </form>
    );
}


