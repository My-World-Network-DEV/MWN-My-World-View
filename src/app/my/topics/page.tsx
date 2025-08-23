import Link from 'next/link';
import AppMenuBar from '@/components/AppMenuBar';

export default function Page() {
    const following = [
        { slug: 'climate', title: 'Climate Change' },
        { slug: 'education', title: 'Education' },
    ];
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-semibold">My Topics</h1>
                <ul className="mt-4 space-y-3">
                    {following.map((t) => (
                        <li key={t.slug} className="rounded-lg border bg-white p-4">
                            <div className="text-base font-semibold">{t.title}</div>
                            <Link href={`/topics/${t.slug}`} className="text-sm text-blue-600 hover:underline">Open</Link>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}


