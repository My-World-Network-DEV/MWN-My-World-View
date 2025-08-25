'use client';

import { useEffect, useMemo, useState } from 'react';

type Post = { id: string; forum_id: string; parent_id: string | null; body: string; created_by: string | null; created_at: string };

export default function ForumThread({ forumId }: { forumId: string }) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [body, setBody] = useState('');

    const tree = useMemo(() => {
        const byParent = new Map<string | null, Post[]>();
        for (const p of posts) {
            const key = p.parent_id;
            const arr = byParent.get(key) ?? [];
            arr.push(p);
            byParent.set(key, arr);
        }
        return byParent;
    }, [posts]);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api/forums/${forumId}/posts`, { cache: 'no-store' });
                if (!res.ok) throw new Error('Failed to load posts');
                const data = (await res.json()) as { posts: Post[] };
                if (!cancelled) setPosts(data.posts ?? []);
            } catch (e: any) {
                if (!cancelled) setError(e?.message ?? 'Failed to load posts');
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [forumId]);

    const submit = async (parentId?: string) => {
        setError(null);
        try {
            const res = await fetch(`/api/forums/${forumId}/posts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ parentId: parentId ?? null, body }) });
            if (!res.ok) throw new Error('Failed to post');
            setBody('');
            const r = await fetch(`/api/forums/${forumId}/posts`, { cache: 'no-store' });
            const d = (await r.json()) as { posts: Post[] };
            setPosts(d.posts ?? []);
        } catch (e: any) {
            setError(e?.message ?? 'Failed to post');
        }
    };

    const renderBranch = (parentId: string | null, depth = 0) => {
        const children = (tree.get(parentId) ?? []).sort((a, b) => a.created_at.localeCompare(b.created_at));
        if (!children.length) return null;
        return (
            <ul className="space-y-2">
                {children.map((p) => (
                    <li key={p.id} className="rounded border bg-white p-3">
                        <div className="text-sm text-gray-700 whitespace-pre-wrap">{p.body}</div>
                        <div className="mt-1 text-xs text-gray-500">{new Date(p.created_at).toLocaleString()}</div>
                        <div className="mt-2">
                            <button className="text-xs text-blue-600 hover:underline" onClick={() => {
                                const text = prompt('Reply');
                                if (text && text.trim()) {
                                    setBody(text.trim());
                                    submit(p.id);
                                }
                            }}>Reply</button>
                        </div>
                        <div className="ml-4 mt-2">{renderBranch(p.id, depth + 1)}</div>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="space-y-3">
            <div>
                <div className="text-lg font-medium">Thread</div>
                {loading ? <div className="text-sm text-gray-600">Loading…</div> : null}
                {error ? <div className="text-sm text-rose-600">{error}</div> : null}
            </div>
            <div className="rounded border bg-white p-3">
                <label className="text-sm font-medium">New post</label>
                <textarea className="mt-2 w-full rounded border px-3 py-2" rows={3} value={body} onChange={(e) => setBody(e.target.value)} />
                <div className="mt-2">
                    <button className="rounded bg-emerald-600 px-3 py-2 text-sm text-white" onClick={() => submit(null)} disabled={!body.trim()}>Post</button>
                </div>
            </div>
            <div>{renderBranch(null)}</div>
        </div>
    );
}


