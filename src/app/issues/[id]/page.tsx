import Link from 'next/link';
import AppMenuBar from '@/components/AppMenuBar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Image from 'next/image';
import ForumOpenButton from '@/components/ForumOpenButton';
import EvidencePanel from '@/components/EvidencePanel';

type MotionListItem = {
  id: string;
  statement: string;
  createdAtMinutesAgo: number;
  stance: { forPct: number; againstPct: number; abstainPct: number };
  argumentsCount: number;
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: issueId } = await params;

  let issue = {
    id: issueId,
    title: 'AI and Entry-Level Jobs',
    definitions: [
      { term: 'Entry-level office roles', def: 'Administrative and clerical roles requiring <3 yrs exp.' },
      { term: 'Automation', def: 'Software or hardware that reduces human task load.' },
    ],
    description:
      'This issue explores how automation impacts early-career office roles, and what policies mitigate displacement.',
    census: { agree: 58, neutral: 13, disagree: 29 },
  };

  let motions: MotionListItem[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/issues/${issueId}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      issue = {
        id: data.issue.id,
        title: data.issue.title,
        definitions: [],
        description: data.issue.description ?? '',
        census: { agree: 0, neutral: 0, disagree: 0 },
      };
      motions = (data.motions ?? []).map((m: { id: string; title: string }) => ({
        id: m.id,
        statement: m.title,
        createdAtMinutesAgo: 0,
        stance: { forPct: 0, againstPct: 0, abstainPct: 0 },
        argumentsCount: 0,
      }));
    }
  } catch { }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppMenuBar />
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs items={[{ href: '/topics', label: 'Topics' }, { href: `/topics/ai-labor`, label: 'AI' }, { label: issue.title }]} />
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold">{issue.title}</h1>
              <p className="mt-1 text-gray-600">{issue.description}</p>

              {/* Issue-level Census (compact) */}
              <div className="mt-3">
                <div className="text-sm font-medium text-gray-700 mb-1">Issue census</div>
                <div className="flex h-2 w-full overflow-hidden rounded bg-gray-200">
                  <div className="bg-emerald-500" style={{ width: `${issue.census.agree}%` }} />
                  <div className="bg-gray-500" style={{ width: `${issue.census.neutral}%` }} />
                  <div className="bg-rose-500" style={{ width: `${issue.census.disagree}%` }} />
                </div>
                <div className="mt-1 text-xs text-gray-600">
                  Agree {issue.census.agree}% · Neutral {issue.census.neutral}% · Disagree {issue.census.disagree}%
                </div>
              </div>
            </div>

            <button className="rounded-lg bg-blue-600 px-3 py-2 text-white">Follow Issue</button>
          </div>

          {/* Canonical definitions */}
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {issue.definitions.map((d) => (
              <div key={d.term} className="rounded border bg-gray-50 p-3">
                <dt className="text-sm font-medium">{d.term}</dt>
                <dd className="text-sm text-gray-600">{d.def}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <main className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12">
        <section className="lg:col-span-8 space-y-4">
          <EvidencePanel header="Issue Evidence" entityType="Issue" entityId={issue.id} />
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Motions in this issue</h2>
            <div className="flex items-center gap-3">
              <ForumOpenButton entityType="Issue" entityId={issue.id} className="text-blue-600 hover:underline" />
              <Link href={`/topics/ai-labor/issues/${issue.id}`} className="text-sm text-blue-600 hover:underline">
                View in Topic
              </Link>
            </div>
          </div>

          <ul className="space-y-3">
            {motions.map((m) => (
              <li key={m.id} className="rounded-lg border bg-white p-4 hover:shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Link href={`/motions/${m.id}`} className="font-semibold hover:underline">
                      {m.statement}
                    </Link>
                    <div className="mt-1 text-xs text-gray-500">
                      {m.argumentsCount} arguments · {m.createdAtMinutesAgo}m ago
                    </div>

                    <div className="mt-3">
                      <div className="text-xs font-medium text-gray-700 mb-1">Census</div>
                      <div className="flex h-2 w-full overflow-hidden rounded bg-gray-200">
                        <div className="bg-emerald-500" style={{ width: `${m.stance.forPct}%` }} />
                        <div className="bg-gray-500" style={{ width: `${m.stance.abstainPct}%` }} />
                        <div className="bg-rose-500" style={{ width: `${m.stance.againstPct}%` }} />
                      </div>
                      <div className="mt-1 text-[11px] text-gray-600">
                        For {m.stance.forPct}% · Against {m.stance.againstPct}% · Abstain {m.stance.abstainPct}%
                      </div>
                    </div>
                  </div>

                  <Image
                    src="/avatar-placeholder.svg"
                    alt=""
                    width={40}
                    height={40}
                    className="shrink-0 rounded"
                  />
                </div>

                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/motions/${m.id}`}
                    className="rounded bg-emerald-600 px-3 py-1 text-sm text-white"
                  >
                    Take a stance
                  </Link>
                  <Link href={`/motions/${m.id}`} className="rounded border px-3 py-1 text-sm hover:bg-gray-50">
                    View arguments
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <aside className="lg:col-span-4 space-y-4">
          <div className="rounded-lg border bg-white p-4">
            <div className="text-sm font-medium">Related issues</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/issues/103" className="hover:underline">
                  Universal basic income pilots
                </Link>
              </li>
              <li>
                <Link href="/issues/104" className="hover:underline">
                  Reskilling with industry partnerships
                </Link>
              </li>
            </ul>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <div className="text-sm font-medium">Top contributors</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Image src="/avatar-placeholder.svg" alt="" width={20} height={20} />
                <span>@analyst_one</span>
              </li>
              <li className="flex items-center gap-2">
                <Image src="/avatar-placeholder.svg" alt="" width={20} height={20} />
                <span>@policy_desk</span>
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
