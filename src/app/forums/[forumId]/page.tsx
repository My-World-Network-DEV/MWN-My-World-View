import AppMenuBar from '@/components/AppMenuBar';
import ProposalForm from '@/components/ProposalForm';
import ForumThread from '@/components/ForumThread';
import PresencePill from '@/components/PresencePill';
import ProposalList from '@/components/ProposalList';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page({ params }: any) {
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto px-4 py-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Forum #{params.forumId}</h1>
                    <PresencePill channelName={`forum-${params.forumId}`} />
                </div>
                <ProposalForm onSubmit={async (payload) => {
                    try {
                        const res = await fetch('/api/proposals', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ forumId: params.forumId, ...payload }) });
                        if (!res.ok) throw new Error('Failed to submit proposal');
                        // naive refresh
                        window.location.reload();
                    } catch (e) {
                        console.error(e);
                    }
                }} />
                <div>
                    <h2 className="text-lg font-medium">Proposals</h2>
                    <div className="mt-2">
                        <ProposalList forumId={params.forumId} />
                    </div>
                </div>
                <ForumThread />
            </main>
        </div>
    );
}


