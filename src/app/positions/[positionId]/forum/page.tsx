import TopNav from '@/components/TopNav';
import ForumThread from '@/components/ForumThread';

export default function Page({ params }: any) {
    return (
        <div className="min-h-screen bg-gray-50">
            <TopNav />
            <main className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-semibold">Position Forum #{params.positionId}</h1>
                <ForumThread />
            </main>
        </div>
    );
}


