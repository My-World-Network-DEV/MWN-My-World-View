import AppMenuBar from '@/components/AppMenuBar';
import Card from '@/components/Card';
import Link from 'next/link';
import { use } from 'react';

type Debate = { id: string; title: string; phase: 'opening' | 'rebuttal' | 'closing' | 'finished'; participants: number; endsInMin?: number };

async function getDebates(): Promise<Debate[]> {
    return [
        { id: 'd1', title: 'UBI improves societal resilience', phase: 'rebuttal', participants: 8, endsInMin: 120 },
        { id: 'd2', title: 'Nuclear should replace coal by 2030', phase: 'opening', participants: 5, endsInMin: 240 },
        { id: 'd3', title: 'Ban plastic bag exports', phase: 'finished', participants: 12 },
    ];
}

export default function Page() {
    const debates = use(getDebates());
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto px-4 py-6 space-y-4">
                <h1 className="text-2xl font-semibold">Debates</h1>
                <p className="text-sm text-gray-600">Browse active and archived debates.</p>
                <div className="grid gap-3 sm:grid-cols-2">
                    {debates.map((d) => (
                        <Card key={d.id} as="article">
                            <div className="flex items-center justify-between">
                                <Link href={`/debates/${d.id}`} className="text-sm font-medium hover:underline">{d.title}</Link>
                                <span className="pill capitalize">{d.phase}</span>
                            </div>
                            <div className="mt-1 text-xs text-gray-600">
                                {d.participants} participants{d.endsInMin ? ` · ${d.endsInMin}m left` : ''}
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}


