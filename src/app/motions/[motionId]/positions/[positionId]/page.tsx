import React from 'react';
import TopNav from '@/components/TopNav';
import StanceBar from '@/components/StanceBar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  const { motionId, positionId } = params as { motionId: string; positionId: string };
  const p = Number(positionId);
  if (![1, 2, 3, 4, 5].includes(p)) {
    // Invalid; render simple fallback
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNav />
        <main className="container mx-auto px-4 py-6">
          <div className="rounded border bg-white p-4">
            <div className="text-sm text-gray-700">Invalid position. <a className="text-blue-600 underline" href={`/motions/${motionId}`}>Back to motion</a></div>
          </div>
        </main>
      </div>
    );
  }

  const motion = { id: motionId, title: 'Motion Title (stub)' };

  let count = 0;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/census/motion/${motionId}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      count = Number((data.counts?.[p as any] ?? 0) as number);
    }
  } catch { }

  const stanceNames: Record<number, string> = { 1: 'Strongly Disagree', 2: 'Disagree', 3: 'Neutral', 4: 'Agree', 5: 'Strongly Agree' };
  const stanceColors: Record<number, string> = { 1: 'bg-rose-600', 2: 'bg-orange-500', 3: 'bg-gray-500', 4: 'bg-emerald-400', 5: 'bg-emerald-600' };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <header className={`${stanceColors[p]} text-white`}>
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold">{stanceNames[p]} Room · {motion.title}</h1>
          <div className="mt-1 text-sm opacity-90">{count} participants</div>
          <div className="mt-2">
            <StanceBar census5={{ counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, total: 0 }} labels={false} />
          </div>
          <div className="mt-3">
            <a href={`/motions/${motionId}`} className="inline-block rounded bg-white/10 px-3 py-1 text-sm hover:bg-white/20">← Back to Motion</a>
          </div>
        </div>
      </header>

      <main className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12">
        <section className="lg:col-span-8 space-y-4">
          <div className="rounded-lg border bg-white p-4">
            <div className="text-sm font-medium">Refine Our Position</div>
            <div className="mt-2 rounded border bg-mwv-muted p-3 text-sm text-gray-700" contentEditable suppressContentEditableWarning>
              Thesis: We {stanceNames[p].toLowerCase()} because…
            </div>
            <div className="mt-2 text-right">
              <button className="rounded bg-mwv-primary px-3 py-1 text-sm text-white">Save</button>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <div className="text-sm font-medium">Arguments & Evidence</div>
            <div className="mt-2 text-sm text-gray-600">No arguments yet. Start the discussion!</div>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <div className="text-sm font-medium">Threaded Discussions</div>
            <div className="mt-2 text-sm text-gray-600">Real-time feed stub.</div>
          </div>
        </section>

        <aside className="lg:col-span-4 space-y-4">
          <div className="rounded-lg border bg-white p-4">
            <div className="text-sm font-medium">Room Participants</div>
            <ul className="mt-2 space-y-1 text-sm text-gray-700">
              <li>Anonymous User</li>
              <li>Anonymous (Hidden)</li>
            </ul>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <div className="text-sm font-medium">AI Prompts</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li><button className="rounded border px-2 py-1">Suggest supporting evidence</button></li>
              <li><button className="rounded border px-2 py-1">Draft counter-argument</button></li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
