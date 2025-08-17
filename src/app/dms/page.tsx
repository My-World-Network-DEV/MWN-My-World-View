import AppMenuBar from '@/components/AppMenuBar';
import Card from '@/components/Card';
import Link from 'next/link';

type Thread = { id: string; with: { name: string; handle: string }; last: string; unread?: number };

const threads: Thread[] = [
    { id: 't1', with: { name: 'Ava', handle: 'ava' }, last: 'Can you review the motion draft?', unread: 2 },
    { id: 't2', with: { name: 'Ben', handle: 'bn' }, last: 'Shared a link to evidence', unread: 0 },
];

export default function Page() {
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12">
                <section className="lg:col-span-4 space-y-3">
                    <h1 className="text-2xl font-semibold">Inbox</h1>
                    <div className="space-y-2">
                        {threads.map((t) => (
                            <Card key={t.id} as="article" className="flex items-center justify-between">
                                <Link href={`/dms/${t.id}`} className="block">
                                    <div className="text-sm font-medium">{t.with.name} <span className="text-gray-500">@{t.with.handle}</span></div>
                                    <div className="text-xs text-gray-600 line-clamp-1">{t.last}</div>
                                </Link>
                                {t.unread ? <span className="pill bg-mwv-accent text-white border-transparent">{t.unread}</span> : null}
                            </Card>
                        ))}
                    </div>
                </section>
                <section className="hidden lg:block lg:col-span-8">
                    <Card>
                        <div className="text-sm text-gray-600">Select a conversation to view messages.</div>
                    </Card>
                </section>
            </main>
        </div>
    );
}


