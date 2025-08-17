'use client';

import { useState } from 'react';

export default function EvidenceAttach({ onChange }: { onChange?: (urls: string[]) => void }) {
    const [urls, setUrls] = useState<string[]>([]);
    return (
        <div className="rounded border bg-white p-3">
            <label className="text-sm font-medium">Evidence URLs</label>
            <div className="mt-2 space-y-2">
                {urls.map((u, idx) => (
                    <div key={idx} className="flex gap-2">
                        <input className="w-full rounded border px-3 py-2" value={u} onChange={(e) => {
                            const next = [...urls]; next[idx] = e.target.value; setUrls(next); onChange?.(next);
                        }} />
                        <button className="rounded border px-2 hover:bg-gray-50" onClick={() => {
                            const next = urls.filter((_, i) => i !== idx); setUrls(next); onChange?.(next);
                        }}>Remove</button>
                    </div>
                ))}
                <button className="rounded border px-3 py-1 text-sm hover:bg-gray-50" onClick={() => {
                    const next = [...urls, '']; setUrls(next); onChange?.(next);
                }}>Add URL</button>
            </div>
        </div>
    );
}


