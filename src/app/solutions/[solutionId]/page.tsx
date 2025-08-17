import TopNav from '@/components/TopNav';
import WorkingGroupPanel from '../../../components/WorkingGroupPanel';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page({ params }: any) {
    return (
        <div className="min-h-screen bg-gray-50">
            <TopNav />
            <main className="container mx-auto px-4 py-6 space-y-4">
                <h1 className="text-2xl font-semibold">Solution #{params.solutionId}</h1>
                <section className="rounded-lg border bg-white p-4">
                    <h2 className="text-lg font-medium">Summary</h2>
                    <p className="mt-2 text-sm text-gray-600">Proposal summary placeholder.</p>
                </section>
                <WorkingGroupPanel />
            </main>
        </div>
    );
}


