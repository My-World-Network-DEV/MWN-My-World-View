import TopNav from '@/components/TopNav';
import StanceSelector from '@/components/StanceSelector';

export default function Page() {
	return (
		<div className="min-h-screen bg-gray-50">
			<TopNav />
			<main className="container mx-auto px-4 py-6 space-y-4">
				<h1 className="text-2xl font-semibold">Create Position</h1>
				<StanceSelector onSubmit={(v) => console.log('stance', v)} />
			</main>
		</div>
	);
}


