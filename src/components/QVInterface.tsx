'use client';

import { useState } from 'react';

type Props = { credits: number; onSpend?: (spent: number) => void };

export default function QVInterface({ credits, onSpend }: Props) {
    const [spent, setSpent] = useState(0);
    return (
        <div className="rounded border bg-white p-3">
            <div className="text-sm">Credits: {credits} · Spent: {spent}</div>
            <input className="mt-2 w-full" type="range" min={0} max={credits} value={spent} onChange={(e) => setSpent(Number(e.target.value))} />
            <button className="mt-2 rounded bg-blue-600 px-3 py-1 text-sm text-white" onClick={() => onSpend?.(spent)}>
                Allocate
            </button>
        </div>
    );
}


