import Link from 'next/link';
import AppMenuBar from '@/components/AppMenuBar';

export default function Page() {
    const topics = [
        { slug: 'climate', title: 'Climate Change', issues: 5 },
        { slug: 'education', title: 'Education', issues: 4 },
        { slug: 'housing', title: 'Housing', issues: 6 },
    ];
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-semibold">Browse Topics</h1>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {topics.map((t) => (
                        <Link key={t.slug} href={`/topics/${t.slug}`} className="rounded-lg border bg-white p-4 hover:shadow-sm">
                            <div className="text-base font-semibold">{t.title}</div>
                            <div className="mt-1 text-xs text-gray-600">{t.issues} issues</div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}


