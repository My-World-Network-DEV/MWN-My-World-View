import AppMenuBar from '@/components/AppMenuBar';
import ForumThread from '@/components/ForumThread';
import PresencePill from '@/components/PresencePill';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page({ params }: any) {
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Debate Forum · {params.debateId}</h1>
                    <PresencePill channelName={`debate-forum-${params.debateId}`} />
                </div>
                <ForumThread />
            </main>
        </div>
    );
}


