import AppMenuBar from '@/components/AppMenuBar';
import Card from '@/components/Card';
import Link from 'next/link';
import { use } from 'react';

type Forum = { id: string; title: string; topic: string; threads: number; lastActivityM: number; status: 'open' | 'resolved' };

async function getForums(): Promise<Forum[]> {
    // mock; later replace with API call
    return [
        { id: 'f1', title: 'AI Ethics in Hiring', topic: 'Artificial intelligence', threads: 42, lastActivityM: 3, status: 'open' },
        { id: 'f2', title: 'Urban Mobility Pilots', topic: 'Urban planning', threads: 18, lastActivityM: 57, status: 'open' },
        { id: 'f3', title: 'Plastic Exports Compliance', topic: 'Climate policy', threads: 12, lastActivityM: 5, status: 'resolved' },
    ];
}

export default function Page() {
    const forums = use(getForums());
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto px-4 py-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Forums</h1>
                        <p className="mt-1 text-sm text-gray-600">Browse discussions grouped by topic.</p>
                    </div>
                    <Link href="/dms" className="rounded bg-mwv-accent px-3 py-2 text-sm text-white">New Post</Link>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                    <button className="pill">All</button>
                    <button className="pill">Open</button>
                    <button className="pill">Resolved</button>
                    <div className="ml-auto flex items-center gap-2">
                        <span className="text-xs text-gray-600">Sort</span>
                        <select className="rounded border px-2 py-1 text-sm">
                            <option value="recent">Recent activity</option>
                            <option value="popular">Most threads</option>
                        </select>
                    </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                    {forums.map((f) => (
                        <Card key={f.id} as="article">
                            <div className="flex items-start justify-between">
                                <div>
                                    <Link href={`/forums/${f.id}`} className="text-sm font-medium hover:underline">{f.title}</Link>
                                    <div className="text-xs text-gray-600">{f.topic}</div>
                                </div>
                                <span className={`pill ${f.status === 'resolved' ? 'bg-emerald-50 border-emerald-200' : ''}`}>{f.status}</span>
                            </div>
                            <div className="mt-2 text-xs text-gray-600">{f.threads} threads · {f.lastActivityM}m ago</div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}


