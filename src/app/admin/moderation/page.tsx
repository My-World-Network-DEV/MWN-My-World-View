import TopNav from '@/components/TopNav';

export default function Page() {
    return (
        <div className="min-h-screen bg-gray-50">
            <TopNav />
            <main className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-semibold">Moderation Queue</h1>
                <div className="mt-4 rounded border bg-white p-4">
                    <p className="text-sm text-gray-600">No items in queue.</p>
                </div>
            </main>
        </div>
    );
}


