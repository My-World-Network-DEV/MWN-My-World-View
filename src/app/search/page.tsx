import React from 'react';
import AppMenuBar from '@/components/AppMenuBar';
import Card from '@/components/Card';

export default async function Page({ searchParams }: { searchParams?: Promise<{ q?: string }> }) {
  const { q } = (await searchParams) ?? {};
  const query = (q ?? '').trim();

  const results = await (async () => {
    if (!query) return { topics: [], issues: [], motions: [], evidence: [] } as any;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/search?q=${encodeURIComponent(query)}`, { cache: 'no-store' });
      if (!res.ok) return { topics: [], issues: [], motions: [], evidence: [] } as any;
      return (await res.json()) as { topics: any[]; issues: any[]; motions: any[]; evidence: any[] };
    } catch { return { topics: [], issues: [], motions: [], evidence: [] } as any; }
  })();

  return (
    <div className="min-h-screen bg-gray-50">
      <AppMenuBar />
      <main className="container mx-auto px-4 py-6 space-y-4">
        <h1 className="text-2xl font-semibold">Search</h1>
        <form className="flex gap-2" action="/search" method="get">
          <input name="q" defaultValue={query} placeholder="Search topics, issues, motions, evidence" className="w-full rounded border px-3 py-2" />
          <button className="rounded bg-emerald-600 px-3 py-2 text-sm text-white" type="submit">Search</button>
        </form>
        <div className="grid gap-3 lg:grid-cols-3">
          <Card>
            <div className="text-sm font-medium">Topics</div>
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              {results.topics.map((t: any) => (
                <li key={t.id}>{t.title}</li>
              ))}
              {!results.topics.length ? <li className="text-gray-500">No results</li> : null}
            </ul>
          </Card>
          <Card>
            <div className="text-sm font-medium">Issues</div>
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              {results.issues.map((i: any) => (
                <li key={i.id}>{i.title}</li>
              ))}
              {!results.issues.length ? <li className="text-gray-500">No results</li> : null}
            </ul>
          </Card>
          <Card>
            <div className="text-sm font-medium">Motions</div>
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              {results.motions.map((m: any) => (
                <li key={m.id}>{m.title}</li>
              ))}
              {!results.motions.length ? <li className="text-gray-500">No results</li> : null}
            </ul>
          </Card>
        </div>
        <Card>
          <div className="text-sm font-medium">Evidence</div>
          <ul className="mt-2 text-sm text-gray-700 space-y-1">
            {results.evidence.map((e: any) => (
              <li key={e.id}><a className="text-blue-600 hover:underline" href={e.url ?? '#'} target="_blank" rel="noreferrer">{e.title ?? e.url}</a></li>
            ))}
            {!results.evidence.length ? <li className="text-gray-500">No results</li> : null}
          </ul>
        </Card>
      </main>
    </div>
  );
}
