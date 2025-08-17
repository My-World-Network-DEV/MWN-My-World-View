'use client';

import { useState } from 'react';
import EvidenceAttach from './EvidenceAttach';

export default function ArgumentForm({ onSubmit }: { onSubmit: (v: { text: string; evidence: string[] }) => void }) {
    const [text, setText] = useState('');
    const [evidence, setEvidence] = useState<string[]>([]);
    return (
        <form
            className="rounded border bg-white p-4 space-y-3"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ text, evidence });
            }}
        >
            <div>
                <label className="text-sm font-medium">Argument</label>
                <textarea className="mt-1 w-full rounded border px-3 py-2" rows={4} value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <EvidenceAttach onChange={setEvidence} />
            <button className="rounded bg-emerald-600 px-3 py-2 text-sm text-white" type="submit">Submit</button>
        </form>
    );
}


