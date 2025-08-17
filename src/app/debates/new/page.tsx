import AppMenuBar from '@/components/AppMenuBar';
import CreateWizard from '../../../components/CreateWizard';

export default function Page() {
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-semibold">Create Debate</h1>
                <CreateWizard steps={["Link Motion/Position", "Format & Phases", "Participants", "Review"]} />
            </main>
        </div>
    );
}


