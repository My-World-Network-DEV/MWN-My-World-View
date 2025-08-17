import TopNav from '@/components/TopNav';
import ProposalForm from '@/components/ProposalForm';
import ForumThread from '@/components/ForumThread';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page({ params }: any) {
    return (
        <div className="min-h-screen bg-gray-50">
            <TopNav />
            <main className="container mx-auto px-4 py-6 space-y-4">
                <h1 className="text-2xl font-semibold">Forum #{params.forumId}</h1>
                <ProposalForm />
                <ForumThread />
            </main>
        </div>
    );
}


