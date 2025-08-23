import AppMenuBar from '@/components/AppMenuBar';
import Card from '@/components/Card';
import StanceBar from '@/components/StanceBar';
import StanceSelector from '@/components/StanceSelector';
import MotionCard from '@/components/MotionCard';
import IssueCard from '@/components/IssueCard';
import TopicCard from '@/components/TopicCard';
import SolutionCard from '@/components/SolutionCard';
import EvidencePanel from '@/components/EvidencePanel';
import ProposalForm from '@/components/ProposalForm';

export default function Page() {
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto px-4 py-6 space-y-4">
                <h1 className="text-2xl font-semibold">Component Gallery</h1>
                <Card>
                    <div className="text-sm font-medium">StanceBar</div>
                    <div className="mt-2">
                        <StanceBar census5={{ counts: { 1: 10, 2: 10, 3: 20, 4: 30, 5: 30 }, total: 100 }} />
                    </div>
                </Card>
                <Card>
                    <div className="text-sm font-medium">StanceSelector</div>
                    <div className="mt-2">
                        <StanceSelector />
                    </div>
                </Card>
                <div className="grid gap-3 sm:grid-cols-2">
                    <MotionCard motion={{ id: 'm1', title: 'Demo Motion', statement: 'This is a motion statement.' }} />
                    <IssueCard issue={{ id: 'i1', title: 'Demo Issue', summary: 'Issue summary', motionsCount: 2 }} />
                    <TopicCard topic={{ id: 't1', title: 'Demo Topic', description: 'Topic description', followers: 10 }} />
                    <SolutionCard solution={{ id: 's1', title: 'Demo solution', votes: { for: 10, against: 2, abstain: 1 } }} />
                </div>
                <EvidencePanel />
                <ProposalForm />
            </main>
        </div>
    );
}


