import Link from 'next/link';
import AppMenuBar from '@/components/AppMenuBar';

export default function Page() {
    const motions = [
        { id: '9001', title: 'Adopt AI Job Retraining Credits' },
        { id: '9002', title: 'Introduce Apprenticeship Tax Offset' },
    ];
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-semibold">Browse Motions</h1>
                <ul className="mt-4 space-y-3">
                    {motions.map((m) => (
                        <li key={m.id} className="rounded-lg border bg-white p-4">
                            <div className="text-base font-semibold">{m.title}</div>
                            <div className="mt-2">
                                <Link href={`/motions/${m.id}`} className="text-sm text-blue-600 hover:underline">Open</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}


