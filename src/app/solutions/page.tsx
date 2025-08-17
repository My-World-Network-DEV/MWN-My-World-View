import AppMenuBar from '@/components/AppMenuBar';
import SolutionCard from '../../components/SolutionCard';

export default function Page() {
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-semibold">Solutions</h1>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <SolutionCard solution={{ id: 'demo', title: 'Demo solution', votes: { for: 10, against: 2, abstain: 1 } }} />
                </div>
            </main>
        </div>
    );
}


