"use client";

import { useMemo, useState } from 'react';

export default function CreateWizard({ steps }: { steps: string[] }) {
    const [i, setI] = useState(0);
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [summary, setSummary] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [privacy, setPrivacy] = useState<'public' | 'private'>('public');

    const pct = useMemo(() => Math.round(((i + 1) / steps.length) * 100), [i, steps.length]);

    return (
        <div className="rounded-lg border bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
                <div className="text-sm font-medium">Step {i + 1} of {steps.length}</div>
                <div className="text-sm">{steps[i]}</div>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded bg-gray-200"><div className="h-full bg-mwv-accent" style={{ width: `${pct}%` }} /></div>
            <div className="mt-3 rounded border bg-gray-50 p-4 text-sm text-gray-700">
                {steps[i] === 'Details' && (
                    <div className="space-y-3">
                        <label className="block">
                            <span className="text-xs text-gray-600">Title</span>
                            <input className="mt-1 w-full rounded border px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </label>
                        <label className="block">
                            <span className="text-xs text-gray-600">Slug</span>
                            <input className="mt-1 w-full rounded border px-3 py-2" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="ai-policy" />
                        </label>
                        <label className="block">
                            <span className="text-xs text-gray-600">Summary</span>
                            <textarea className="mt-1 w-full rounded border px-3 py-2" rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} />
                        </label>
                    </div>
                )}
                {steps[i] === 'Categories' && (
                    <div>
                        <div className="text-xs text-gray-600">Select categories</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {['Policy', 'Tech', 'Environment', 'Health'].map((c) => (
                                <button key={c} type="button" className={`pill ${categories.includes(c) ? 'bg-mwv-accent text-white border-transparent' : ''}`} onClick={() => setCategories((arr) => arr.includes(c) ? arr.filter((x) => x !== c) : [...arr, c])}>{c}</button>
                            ))}
                        </div>
                    </div>
                )}
                {steps[i] === 'Privacy' && (
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm"><input type="radio" name="privacy" checked={privacy === 'public'} onChange={() => setPrivacy('public')} /> Public</label>
                        <label className="flex items-center gap-2 text-sm"><input type="radio" name="privacy" checked={privacy === 'private'} onChange={() => setPrivacy('private')} /> Private (invite only)</label>
                    </div>
                )}
                {steps[i] === 'Review' && (
                    <div className="space-y-2">
                        <div><span className="font-medium">Title:</span> {title || '—'}</div>
                        <div><span className="font-medium">Slug:</span> {slug || '—'}</div>
                        <div><span className="font-medium">Summary:</span> {summary || '—'}</div>
                        <div><span className="font-medium">Categories:</span> {categories.join(', ') || '—'}</div>
                        <div><span className="font-medium">Privacy:</span> {privacy}</div>
                        <button className="mt-2 rounded bg-mwv-accent px-3 py-2 text-sm text-white">Create topic</button>
                    </div>
                )}
            </div>
            <div className="mt-3 flex justify-between">
                <button className="rounded border px-3 py-1 text-sm hover:bg-gray-50" onClick={() => setI((n) => Math.max(0, n - 1))} disabled={i === 0}>Back</button>
                <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white" onClick={() => setI((n) => Math.min(steps.length - 1, n + 1))} disabled={i === steps.length - 1}>Next</button>
            </div>
        </div>
    );
}


