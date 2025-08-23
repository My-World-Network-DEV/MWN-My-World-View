import Link from 'next/link';
import AppMenuBar from '@/components/AppMenuBar';

export default function Page() {
    const issues = [
        { id: '101', title: 'AI and Entry-Level Jobs', topic: 'Artificial Intelligence' },
        { id: '205', title: 'Teacher Retention Incentives', topic: 'Education' },
    ];
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-semibold">Browse Issues</h1>
                <ul className="mt-4 space-y-3">
                    {issues.map((i) => (
                        <li key={i.id} className="rounded-lg border bg-white p-4">
                            <div className="text-base font-semibold">{i.title}</div>
                            <div className="text-xs text-gray-600">Topic: {i.topic}</div>
                            <div className="mt-2">
                                <Link href={`/issues/${i.id}`} className="text-sm text-blue-600 hover:underline">Open</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}


