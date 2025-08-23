import AppMenuBar from '@/components/AppMenuBar';
import ForumThread from '@/components/ForumThread';
import PresencePill from '@/components/PresencePill';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Topic Forum · {slug}</h1>
                    <PresencePill channelName={`topic-forum-${slug}`} />
                </div>
                <ForumThread />
            </main>
        </div>
    );
}


