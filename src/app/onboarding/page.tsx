import AppMenuBar from '@/components/AppMenuBar';

export default function Page() {
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto px-4 py-6 space-y-3">
                <h1 className="text-2xl font-semibold">Welcome to MWV</h1>
                <ol className="list-decimal pl-5 text-sm text-gray-700">
                    <li>Follow topics</li>
                    <li>Join a motion</li>
                    <li>Take a stance</li>
                </ol>
            </main>
        </div>
    );
}


