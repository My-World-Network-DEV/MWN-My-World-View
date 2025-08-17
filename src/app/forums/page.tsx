import TopNav from '@/components/TopNav';

export default function Page() {
    return (
        <div className="min-h-screen bg-gray-50">
            <TopNav />
            <main className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-semibold">Forums</h1>
                <p className="mt-2 text-sm text-gray-600">Browse entity-linked forums.</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">{/* TODO list forums */}</div>
            </main>
        </div>
    );
}


