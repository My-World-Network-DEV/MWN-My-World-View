'use client';

import { useEffect, useState } from 'react';

type Evidence = { id: string; url: string | null; title: string | null; domain: string | null; credibility: number | null; source_type: string | null };

export default function EvidencePanel({ header = 'Evidence', entityType, entityId }: { header?: string; entityType?: 'Topic' | 'Issue' | 'Motion' | 'Position' | 'Debate' | 'Solution'; entityId?: string }) {
    const [items, setItems] = useState<Evidence[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [sourceType, setSourceType] = useState('news');
    const [cred, setCred] = useState(3);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true);
            try {
                const qs = entityType && entityId ? `?entityType=${encodeURIComponent(entityType)}&entityId=${encodeURIComponent(entityId)}` : '';
                const res = await fetch(`/api/evidence${qs}`, { cache: 'no-store' });
                if (!res.ok) throw new Error('Failed to load evidence');
                const data = (await res.json()) as { evidence: Evidence[] };
                if (!cancelled) setItems(data.evidence ?? []);
            } catch (e: any) {
                if (!cancelled) setError(e?.message ?? 'Failed to load evidence');
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [entityType, entityId]);

    const addEvidence = async () => {
        setError(null);
        try {
            const res = await fetch('/api/evidence', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url, title, sourceType, credibility: cred, entityType, entityId }) });
            if (!res.ok) throw new Error('Failed to add evidence');
            setUrl(''); setTitle(''); setSourceType('news'); setCred(3);
            // refresh
            const qs = entityType && entityId ? `?entityType=${encodeURIComponent(entityType)}&entityId=${encodeURIComponent(entityId)}` : '';
            const r = await fetch(`/api/evidence${qs}`, { cache: 'no-store' });
            const d = (await r.json()) as { evidence: Evidence[] };
            setItems(d.evidence ?? []);
        } catch (e: any) {
            setError(e?.message ?? 'Failed to add evidence');
        }
    };

    return (
        <div className="rounded-lg border bg-white p-4">
            <div className="text-sm font-medium">{header}</div>
            <div className="mt-2 flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                    <input className="min-w-[220px] flex-1 rounded border px-3 py-2" placeholder="Evidence URL" value={url} onChange={(e) => setUrl(e.target.value)} />
                    <input className="min-w-[180px] rounded border px-3 py-2" placeholder="Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <select className="rounded border px-2 py-2" value={sourceType} onChange={(e) => setSourceType(e.target.value)}>
                        <option value="academic">Academic</option>
                        <option value="government">Government</option>
                        <option value="news">News</option>
                        <option value="expert">Expert</option>
                        <option value="personal">Personal</option>
                    </select>
                    <div className="flex items-center gap-2 text-sm">
                        <span>Cred</span>
                        <input type="range" min={1} max={5} value={cred} onChange={(e) => setCred(Number(e.target.value))} />
                        <span>{cred}</span>
                    </div>
                    <button className="rounded bg-blue-600 px-3 py-2 text-sm text-white" onClick={addEvidence}>Add</button>
                </div>
                {loading ? <div className="text-sm text-gray-600">Loading…</div> : null}
                {error ? <div className="text-sm text-rose-600">{error}</div> : null}
                <ul className="mt-2 divide-y">
                    {items.map((ev) => (
                        <li key={ev.id} className="py-2 text-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <a className="text-blue-600 hover:underline" href={ev.url ?? '#'} target="_blank" rel="noreferrer">{ev.title ?? ev.url}</a>
                                    <div className="text-xs text-gray-600">{ev.domain ?? ''} · {ev.source_type ?? ''}</div>
                                </div>
                                <span className="text-xs rounded border px-2 py-0.5">{ev.credibility ?? '-'}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


