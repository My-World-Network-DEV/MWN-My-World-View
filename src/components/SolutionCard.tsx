type VoteCounts = { for: number; against: number; abstain: number };
type Solution = { id: string; title: string; votes: VoteCounts };

export default function SolutionCard({ solution }: { solution: Solution }) {
    const total = Math.max(1, solution.votes.for + solution.votes.against + solution.votes.abstain);
    const pct = (n: number) => Math.round((n / total) * 100);
    return (
        <article className="rounded-lg border bg-white p-4 hover:shadow-sm">
            <h3 className="font-medium">{solution.title}</h3>
            <div className="mt-2 flex h-2 w-full overflow-hidden rounded bg-gray-200">
                <div className="bg-emerald-500" style={{ width: `${pct(solution.votes.for)}%` }} />
                <div className="bg-gray-500" style={{ width: `${pct(solution.votes.abstain)}%` }} />
                <div className="bg-rose-500" style={{ width: `${pct(solution.votes.against)}%` }} />
            </div>
            <div className="mt-2 text-xs text-gray-600">
                For {pct(solution.votes.for)}% · Against {pct(solution.votes.against)}% · Abstain {pct(solution.votes.abstain)}%
            </div>
        </article>
    );
}


