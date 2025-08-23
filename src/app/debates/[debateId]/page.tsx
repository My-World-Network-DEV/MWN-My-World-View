import AppMenuBar from '@/components/AppMenuBar';
import DebateCanvas from '@/components/DebateCanvas';
import Card from '@/components/Card';

type Phase = 'opening' | 'rebuttal' | 'closing' | 'finished';

async function getDebate(debateId: string) {
    return {
        id: debateId,
        title: 'UBI improves societal resilience',
        phase: 'rebuttal' as Phase,
        participants: 8,
        nodes: [
            { id: 'p1', label: 'Opening: UBI provides safety net' },
            { id: 'p2', label: 'Rebuttal: Disincentivises work' },
            { id: 'p3', label: 'Closing: Data shows participation stable' },
        ],
        edges: [
            { source: 'p1', target: 'p2' },
            { source: 'p2', target: 'p3' },
        ],
    };
}

export default async function Page({ params }: { params: Promise<{ debateId: string }> }) {
    const { debateId } = await params;
    const debate = await getDebate(debateId);
    const phases: Phase[] = ['opening', 'rebuttal', 'closing'];
    const currentIdx = Math.max(0, phases.indexOf(debate.phase as Phase));
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto px-4 py-6 space-y-4">
                <h1 className="text-2xl font-semibold">{debate.title}</h1>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>{debate.participants} participants</span>
                    <span>·</span>
                    <span className="capitalize">Phase: {debate.phase}</span>
                </div>
                <Card>
                    <div className="mb-3">
                        <div className="text-sm font-medium">Progress</div>
                        <div className="mt-1 flex gap-2">
                            {phases.map((p, i) => (
                                <div key={p} className={`flex-1 rounded-full ${i <= currentIdx ? 'bg-mwv-success' : 'bg-gray-200'} h-1.5`} aria-label={`${p} ${i <= currentIdx ? 'completed' : 'pending'}`} />
                            ))}
                        </div>
                    </div>
                    <DebateCanvas nodes={debate.nodes} edges={debate.edges} />
                </Card>
                <Card>
                    <div className="text-sm font-medium">Submit argument</div>
                    <form className="mt-2 space-y-2">
                        <textarea className="w-full rounded border px-3 py-2 text-sm" rows={3} placeholder="Your argument…" />
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-600">Attach evidence links or files</div>
                            <button className="rounded bg-mwv-accent px-3 py-2 text-sm text-white">Submit</button>
                        </div>
                    </form>
                </Card>
            </main>
        </div>
    );
}


