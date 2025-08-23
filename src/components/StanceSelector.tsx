'use client';

import React from 'react';
import { useState } from 'react';

type Privacy = 'public' | 'anonymous' | 'hiddenWeighted';
type SubmitPayload = {
    stance: 1 | 2 | 3 | 4 | 5;
    privacy: Privacy;
    reasonText?: string;
    evidenceUrls?: string[];
};
type Props = { onSubmit?: (v: SubmitPayload) => void; initial?: Partial<SubmitPayload> };

export default function StanceSelector({ onSubmit, initial }: Props) {
    const [stance, setStance] = useState<1 | 2 | 3 | 4 | 5>((initial?.stance as any) || 3);
    const [privacy, setPrivacy] = useState<Privacy>((initial?.privacy as any) || 'public');
    const [reasonText, setReasonText] = useState<string>(initial?.reasonText || '');
    const [evidenceUrls, setEvidenceUrls] = useState<string[]>(initial?.evidenceUrls || []);
    const handleSubmit = onSubmit ?? (() => { });

    return (
        <form
            className="rounded border bg-white p-4 space-y-3"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit({ stance, privacy, reasonText: reasonText || undefined, evidenceUrls: evidenceUrls.filter(Boolean) });
            }}
        >
            <div>
                <label htmlFor="stance-range" className="text-sm font-medium">Stance: {stance}</label>
                <input id="stance-range" aria-label="Select stance from 1 Strongly Disagree to 5 Strongly Agree" className="mt-1 w-full" type="range" min={1} max={5} step={1} value={stance} onChange={(e) => setStance(Number(e.target.value) as any)} />
                <div className="mt-1 grid grid-cols-5 text-[11px] text-gray-600">
                    <span>1 SD</span>
                    <span className="text-center">2 D</span>
                    <span className="text-center">3 N</span>
                    <span className="text-center">4 A</span>
                    <span className="text-right">5 SA</span>
                </div>
            </div>
            <div>
                <label htmlFor="privacy-select" className="text-sm font-medium">Privacy</label>
                <select id="privacy-select" aria-describedby="privacy-help" className="mt-1 w-full rounded border px-3 py-2" value={privacy} onChange={(e) => setPrivacy(e.target.value as any)}>
                    <option value="public">Public</option>
                    <option value="anonymous">Anonymous</option>
                    <option value="hiddenWeighted">Hidden (Weighted)</option>
                </select>
                <div id="privacy-help" className="mt-1 text-[11px] text-gray-500">Hidden: included in metrics, identity not shown.</div>
            </div>
            <div>
                <label htmlFor="reason-text" className="text-sm font-medium">Reason (optional)</label>
                <textarea id="reason-text" className="mt-1 w-full rounded border px-3 py-2" rows={3} maxLength={500} value={reasonText} onChange={(e) => setReasonText(e.target.value)} placeholder="Explain your stance (max 500 chars)" />
            </div>
            <div>
                <label className="text-sm font-medium">Evidence URLs (optional)</label>
                <div className="mt-1 space-y-2">
                    {evidenceUrls.map((u, idx) => (
                        <div key={idx} className="flex gap-2">
                            <input className="flex-1 rounded border px-3 py-2" value={u} onChange={(e) => setEvidenceUrls((arr) => arr.map((x, i) => (i === idx ? e.target.value : x)))} placeholder="https://…" />
                            <button type="button" className="rounded border px-2" onClick={() => setEvidenceUrls((arr) => arr.filter((_, i) => i !== idx))}>Remove</button>
                        </div>
                    ))}
                    <button type="button" className="rounded border px-3 py-1 text-sm" onClick={() => setEvidenceUrls((arr) => [...arr, ''])}>Add link</button>
                </div>
            </div>
            <button className="rounded bg-emerald-600 px-3 py-2 text-sm text-white" type="submit">Submit & Enter Room</button>
        </form>
    );
}


