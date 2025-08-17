import TopNav from '@/components/TopNav';
import CreateWizard from '../../../components/CreateWizard';

export default function Page() {
    return (
        <div className="min-h-screen bg-gray-50">
            <TopNav />
            <main className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-semibold">Create Issue</h1>
                <CreateWizard steps={["Topic", "Issue Statement", "Definitions/Evidence", "Review"]} />
            </main>
        </div>
    );
}


