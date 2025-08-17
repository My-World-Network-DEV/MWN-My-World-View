import TopNav from '@/components/TopNav';

export default function Page({ params }: { params: { debateId: string } }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <TopNav />
            <main className="container mx-auto px-4 py-6 space-y-4">
                <h1 className="text-2xl font-semibold">Debate #{params.debateId}</h1>
                <div className="rounded-lg border bg-white p-4">
                    {/* TODO: <DebateCanvas /> + phases + arguments */}
                    <p className="text-sm text-gray-600">Debate canvas placeholder.</p>
                </div>
            </main>
        </div>
    );
}


