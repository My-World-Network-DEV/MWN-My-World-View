import Link from 'next/link';
import TopNav from '@/components/TopNav';
import StanceBar from '@/components/StanceBar';

type CensusAPI = { motionId: string; total: number; counts: { for: number; against: number; abstain: number } };

async function getCensus(motionId: string): Promise<CensusAPI | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/census/motion/${motionId}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return (await res.json()) as CensusAPI;
  } catch {
    return null;
  }
}

export default async function Page({ params }: any) {
  const { motionId } = params;

  // --- Mock motion copy (replace with Supabase wired data later) ---
  const motion = {
    id: motionId,
    statement: 'AI will displace more jobs than it creates (by 2035).',
    issue: { id: '101', title: 'AI and Entry-Level Jobs' },
    author: { name: 'Ava', handle: 'ava', atMinutes: 32 },
    related: [
      { id: '9003', title: 'Mandate employer-funded reskilling for affected roles' },
      { id: '9004', title: 'Expand apprenticeship pathways in tech-adjacent fields' },
    ],
  };

  const api = await getCensus(motionId);

  const counts = api?.counts ?? { for: 55, against: 35, abstain: 10 };
  const total = api?.total ?? 100;

  const toPct = (n: number) => Math.round((n / Math.max(total, 1)) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12">
        <section className="lg:col-span-8 space-y-4">
          {/* Header */}
          <div className="rounded-lg border bg-white p-4">
            <div className="text-xs text-gray-500">Motion · <Link href={`/issues/${motion.issue.id}`} className="hover:underline">{motion.issue.title}</Link></div>
            <h1 className="mt-1 text-2xl font-semibold">{motion.statement}</h1>
            <div className="mt-1 text-xs text-gray-500">
              by @{motion.author.handle} · {motion.author.atMinutes}m ago
            </div>
          </div>

          {/* Census card */}
          <div className="rounded-lg border bg-white p-4">
            <div className="text-sm font-medium mb-2">Census</div>
            <StanceBar counts={counts} />
            <div className="mt-2 text-xs text-gray-600">
              For {toPct(counts.for)}% · Against {toPct(counts.against)}% · Abstain {toPct(counts.abstain)}%
              {api ? ` · ${api.total.toLocaleString()} participants` : ' · mock data'}
            </div>
            <div className="mt-3 flex gap-2">
              <Link href="#" className="rounded bg-emerald-600 px-3 py-2 text-sm text-white">
                Vote For
              </Link>
              <Link href="#" className="rounded bg-rose-600 px-3 py-2 text-sm text-white">
                Vote Against
              </Link>
              <Link href="#" className="rounded bg-gray-200 px-3 py-2 text-sm">
                Abstain
              </Link>
            </div>
          </div>

          {/* Top arguments (mock) */}
          <div className="rounded-lg border bg-white p-4">
            <div className="text-sm font-medium">Top arguments</div>
            <ul className="mt-2 space-y-3 text-sm">
              <li className="rounded border p-3">
                <div className="font-medium">Automation trend data suggests net displacement</div>
                <p className="text-gray-600 mt-1">
                  OECD and ILO reports estimate high exposure of routine tasks. Evidence links go here.
                </p>
              </li>
              <li className="rounded border p-3">
                <div className="font-medium">Counter: historical tech cycles created new categories</div>
                <p className="text-gray-600 mt-1">
                  Productivity surges historically led to complementary roles. Cite sources here.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <aside className="lg:col-span-4 space-y-4">
          <div className="rounded-lg border bg-white p-4">
            <div className="text-sm font-medium">Related motions</div>
            <ul className="mt-2 space-y-2 text-sm">
              {motion.related.map((rm) => (
                <li key={rm.id}>
                  <Link href={`/motions/${rm.id}`} className="hover:underline">
                    {rm.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <div className="text-sm font-medium">Actions</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="#" className="text-blue-600 hover:underline">
                  Propose a solution
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-600 hover:underline">
                  View debate log
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
