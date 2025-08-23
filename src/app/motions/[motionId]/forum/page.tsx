import AppMenuBar from '@/components/AppMenuBar';
import ForumThread from '@/components/ForumThread';
import PresencePill from '@/components/PresencePill';

export default async function Page({ params }: { params: Promise<{ motionId: string }> }) {
    const { motionId } = await params;
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Motion Forum · {motionId}</h1>
                    <PresencePill channelName={`motion-forum-${motionId}`} />
                </div>
                <ForumThread />
            </main>
        </div>
    );
}


