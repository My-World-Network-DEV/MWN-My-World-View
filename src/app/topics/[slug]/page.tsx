import Image from 'next/image';
import Link from 'next/link';
import AppMenuBar from '@/components/AppMenuBar';

type Issue = {
  id: string;
  title: string;
  summary: string;
  motionsCount: number;
  census?: { agreePct: number; disagreePct: number; neutralPct: number };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page({ params }: any) {
  // --- Mock topic + issues ---
  const topicSlug = params.slug;
  const topic = {
    title: topicSlug.replace(/-/g, ' ').replace(/\b\w/g, (m: string) => m.toUpperCase()),
    summary:
      'Curated debates, issues, and motions in this topic. Explore active issues, see stance splits, and jump into motions.',
    followers: 1240,
  };

  const issues: Issue[] = [
    {
      id: '101',
      title: 'AI and Entry-Level Jobs',
      summary:
        'Will automation disproportionately impact entry-level office roles over the next decade?',
      motionsCount: 6,
      census: { agreePct: 58, disagreePct: 29, neutralPct: 13 },
    },
    {
      id: '102',
      title: 'Education Funding Models',
      summary:
        'Should public funding be reallocated toward vocational training and apprenticeships?',
      motionsCount: 4,
      census: { agreePct: 41, disagreePct: 44, neutralPct: 15 },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AppMenuBar />
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Image
              src="/avatar-placeholder.svg"
              alt=""
              width={48}
              height={48}
              className="rounded"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-semibold">{topic.title}</h1>
              <p className="text-gray-600 mt-1">{topic.summary}</p>
              <div className="mt-2 text-sm text-gray-500">
                <span className="mr-2">Followers: {topic.followers.toLocaleString()}</span>
                <span className="inline-block rounded bg-gray-100 px-2 py-0.5">
                  {issues.length} active issues
                </span>
              </div>
            </div>
            <button className="rounded-lg bg-blue-600 px-3 py-2 text-white">Follow</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12">
        <section className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Issues</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <button className="rounded bg-white px-3 py-1 border">Trending</button>
              <button className="rounded bg-white px-3 py-1 border">New</button>
              <button className="rounded bg-white px-3 py-1 border">AI‑highlighted</button>
            </div>
          </div>

          <ul className="space-y-3">
            {issues.map((issue) => (
              <li key={issue.id} className="rounded-lg border bg-white p-4 hover:shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="pr-4">
                    <Link
                      href={`/issues/${issue.id}`}
                      className="text-base font-semibold hover:underline"
                    >
                      {issue.title}
                    </Link>
                    <p className="mt-1 text-sm text-gray-600">{issue.summary}</p>
                    <div className="mt-2 text-xs text-gray-500">
                      {issue.motionsCount} motions
                    </div>
                  </div>
                  <div className="w-48">
                    {/* Compact census bar (mock) */}
                    <div className="text-xs font-medium text-gray-600 mb-1">Census</div>
                    <div className="flex h-2 w-full overflow-hidden rounded bg-gray-200">
                      <div
                        className="bg-emerald-500"
                        style={{ width: `${issue.census?.agreePct ?? 0}%` }}
                        aria-hidden
                      />
                      <div
                        className="bg-gray-500"
                        style={{ width: `${issue.census?.neutralPct ?? 0}%` }}
                        aria-hidden
                      />
                      <div
                        className="bg-rose-500"
                        style={{ width: `${issue.census?.disagreePct ?? 0}%` }}
                        aria-hidden
                      />
                    </div>
                    <div className="mt-1 text-[11px] text-gray-600">
                      Agree {issue.census?.agreePct ?? 0}% · Disagree {issue.census?.disagreePct ?? 0}
                      % · Neutral {issue.census?.neutralPct ?? 0}%
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/topics/${topicSlug}/issues/${issue.id}`}
                    className="rounded border px-3 py-1 text-sm hover:bg-gray-50"
                  >
                    View in Topic
                  </Link>
                  <Link
                    href={`/issues/${issue.id}`}
                    className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
                  >
                    Open Issue
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <aside className="lg:col-span-4 space-y-4">
          <div className="rounded-lg border bg-white p-4">
            <div className="text-sm font-medium">Trending motions</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/motions/9001" className="hover:underline">
                  Adopt AI job retraining credits
                </Link>
              </li>
              <li>
                <Link href="/motions/9002" className="hover:underline">
                  Introduce apprenticeship tax offset
                </Link>
              </li>
            </ul>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <div className="text-sm font-medium">About this topic</div>
            <p className="mt-2 text-sm text-gray-600">
              Definitions, related issues, and curated sources appear here.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}
