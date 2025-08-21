import Link from 'next/link';
import AppMenuBar from '@/components/AppMenuBar';
import Breadcrumbs from '@/components/Breadcrumbs';
import StanceBar from '@/components/StanceBar';
import MotionCensusRealtime from '@/components/MotionCensusRealtime';
import StanceSelector from '@/components/StanceSelector';

//

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  const { motionId } = params;

  // Fetch motion details from API (falls back to mock if env missing)
  const motionResp = await (async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/motions/${motionId}`, { cache: 'no-store' });
      if (!res.ok) return null;
      return (await res.json()) as any;
    } catch {
      return null;
    }
  })();
  const motion = motionResp?.motion ?? {
    id: motionId,
    title: 'AI will displace more jobs than it creates (by 2035).',
    description: null,
    issue: { id: '101', title: 'AI and Entry-Level Jobs' },
    related: [
      { id: '9003', title: 'Mandate employer-funded reskilling for affected roles' },
      { id: '9004', title: 'Expand apprenticeship pathways in tech-adjacent fields' },
    ],
  };

  const api = await (async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/census/motion/${motionId}`, { cache: 'no-store' });
      if (!res.ok) return null;
      return (await res.json()) as { counts: Record<number, number>; total: number; percentages?: Record<number, number> };
    } catch {
      return null;
    }
  })();

  const counts5 = (api?.counts as Record<number, number> | undefined) ?? { 1: 10, 2: 10, 3: 20, 4: 30, 5: 30 };
  const total = api?.total ?? Object.values(counts5).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppMenuBar />
      <main className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12">
        <section className="lg:col-span-8 space-y-4">
          {/* Header */}
          <div className="rounded-lg border bg-white p-4">
            <Breadcrumbs items={[{ href: '/topics', label: 'Topics' }, { href: `/issues/${motion.issue.id}`, label: motion.issue.title }, { label: `Motion #${motion.id}` }]} />
            <div className="text-xs text-gray-500 mt-1">Motion · {motion.issue ? (<Link href={`/issues/${motion.issue.id}`} className="hover:underline">{motion.issue.title}</Link>) : 'Unlinked Issue'}</div>
            <h1 className="mt-1 text-2xl font-semibold">{motion.title}</h1>
            {motion.description ? (<div className="mt-1 text-sm text-gray-600">{motion.description}</div>) : null}
          </div>

          {/* Census card */}
          <div className="rounded-lg border bg-white p-4">
            <div className="text-sm font-medium mb-2">Census</div>
            {api ? (
              <MotionCensusRealtime motionId={motionId} initialCounts={counts5 as any} />
            ) : (
              <StanceBar census5={{ counts: counts5 as any, total }} />
            )}
            <div className="mt-2 text-xs text-gray-600">{api ? `${total.toLocaleString()} participants` : 'mock data'}</div>
            <div className="mt-3 flex gap-2">
              <div className="w-full">
                <StanceSelector
                  onSubmit={async ({ stance, privacy, reasonText, evidenceUrls }) => {
                    const detail = { motionId: motionId as string, stance } as const;
                    try {
                      // optimistic increment
                      window.dispatchEvent(new CustomEvent('stance:submitted', { detail }));
                      const res = await fetch('/api/stance-events', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ motionId: motionId, stance, privacy, reasonText, evidenceUrls }),
                      });
                      if (!res.ok) throw new Error('failed');
                      window.location.href = `/motions/${motionId}/positions/${stance}`;
                    } catch {
                      // rollback optimistic if failed
                      window.dispatchEvent(new CustomEvent('stance:rollback', { detail }));
                    }
                  }}
                />
              </div>
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
              {(motion.related ?? []).map((rm: any) => (
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
