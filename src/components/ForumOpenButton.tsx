'use client';

import { useState } from 'react';

export default function ForumOpenButton({ entityType, entityId, className }: { entityType: 'Topic' | 'Issue' | 'Motion' | 'Position' | 'Debate' | 'Solution'; entityId: string; className?: string }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onOpen = async () => {
        setLoading(true);
        setError(null);
        try {
            // Try to find existing forum
            const q = new URLSearchParams({ entityType, entityId }).toString();
            let res = await fetch(`/api/forums?${q}`, { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to lookup forum');
            const data = (await res.json()) as { forums?: Array<{ id: string }> };
            let forumId = data.forums && data.forums[0]?.id;
            if (!forumId) {
                // Create forum if missing
                res = await fetch('/api/forums', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ entityType, entityId }) });
                if (!res.ok) throw new Error('Failed to create forum');
                const created = (await res.json()) as { id: string };
                forumId = created.id;
            }
            if (forumId) window.location.href = `/forums/${forumId}`;
        } catch (e: any) {
            setError(e?.message ?? 'Failed to open forum');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={onOpen} disabled={loading} className={className ?? 'rounded border px-3 py-1 text-sm hover:bg-gray-50'}>
                {loading ? 'Opening…' : 'Open Forum'}
            </button>
            {error ? <div className="mt-1 text-xs text-rose-600">{error}</div> : null}
        </div>
    );
}


