import Link from 'next/link';
import AppMenuBar from '@/components/AppMenuBar';

export default function Page() {
    const mine = [
        { id: 's1', title: 'Apprenticeship funding pool' },
    ];
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-semibold">My Solutions</h1>
                <ul className="mt-4 space-y-3">
                    {mine.map((s) => (
                        <li key={s.id} className="rounded-lg border bg-white p-4">
                            <div className="text-base font-semibold">{s.title}</div>
                            <Link href={`/solutions/${s.id}`} className="text-sm text-blue-600 hover:underline">Open</Link>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}


