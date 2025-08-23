import Link from 'next/link';
import AppMenuBar from '@/components/AppMenuBar';

export default function Page() {
    const positions = [
        { motionId: '9001', stance: 1 },
        { motionId: '9001', stance: 3 },
        { motionId: '9001', stance: 5 },
    ];
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-semibold">Browse Positions</h1>
                <ul className="mt-4 space-y-3">
                    {positions.map((p, idx) => (
                        <li key={idx} className="rounded-lg border bg-white p-4">
                            <div className="text-base font-semibold">Motion {p.motionId} – Stance {p.stance}</div>
                            <div className="mt-2">
                                <Link href={`/motions/${p.motionId}/positions/${p.stance}`} className="text-sm text-blue-600 hover:underline">Open</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}


