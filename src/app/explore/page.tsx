import Link from 'next/link';
import TopNav from '@/components/TopNav';

type TopicTile = { slug: string; title: string; issuesCount: number };
type IssueTile = { id: string; title: string; topicSlug: string };
type Post = {
  id: string;
  author: { name: string; handle: string; avatarUrl?: string };
  minutesAgo: number;
  text: string;
  evidenceCount?: number;
};

export default function Page() {
  const topics: TopicTile[] = [
    { slug: 'artificial-intelligence', title: 'Artificial Intelligence', issuesCount: 12 },
    { slug: 'education', title: 'Education', issuesCount: 9 },
    { slug: 'housing', title: 'Housing', issuesCount: 7 },
  ];

  const issues: IssueTile[] = [
    { id: '101', title: 'AI and Entry-Level Jobs', topicSlug: 'artificial-intelligence' },
    { id: '205', title: 'Teacher retention incentives', topicSlug: 'education' },
    { id: '330', title: 'Zoning reform for density', topicSlug: 'housing' },
  ];

  const posts: Post[] = [
    { id: '1', author: { name: 'Tanual', handle: 'tanu' }, minutesAgo: 2, text: 'Reskilling credits could be targeted at ages 18–24.', evidenceCount: 3 },
    { id: '2', author: { name: 'Ethel', handle: 'ethe' }, minutesAgo: 9, text: 'UBI pilots show mixed labor effects; need better metrics.' },
    { id: '3', author: { name: 'Enoel', handle: 'enl' }, minutesAgo: 21, text: 'Zoning overlays increased supply in similar cities.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12">
        <section className="lg:col-span-8 space-y-6">
          {/* Filters */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Explore</h1>
            <div className="flex gap-2 text-sm">
              <button className="rounded border bg-white px-3 py-1">Trending</button>
              <button className="rounded border bg-white px-3 py-1">Latest</button>
              <button className="rounded border bg-white px-3 py-1">Following</button>
            </div>
          </div>

          {/* Topic grid */}
          <div>
            <div className="mb-2 text-sm font-medium">Topics</div>
            <div className="grid gap-3 sm:grid-cols-2">
              {topics.map((t) => (
                <Link
                  key={t.slug}
                  href={`/topics/${t.slug}`}
                  className="rounded-lg border bg-white p-4 hover:shadow-sm"
                >
                  <div className="text-base font-semibold">{t.title}</div>
                  <div className="mt-1 text-xs text-gray-500">{t.issuesCount} issues</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Issue grid */}
          <div>
            <div className="mb-2 mt-2 text-sm font-medium">Issues</div>
            <div className="grid gap-3 sm:grid-cols-2">
              {issues.map((i) => (
                <Link
                  key={i.id}
                  href={`/issues/${i.id}`}
                  className="rounded-lg border bg-white p-4 hover:shadow-sm"
                >
                  <div className="text-base font-semibold">{i.title}</div>
                  <div className="mt-1 text-xs text-gray-500">Topic: {i.topicSlug}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Posts preview (optional) */}
          <div>
            <div className="mb-2 mt-2 text-sm font-medium">Recent posts</div>
            <ul className="space-y-3">
              {posts.map((p) => (
                <li key={p.id} className="rounded-lg border bg-white p-4">
                  <div className="text-sm">
                    <span className="font-medium">@{p.author.handle}</span>{' '}
                    <span className="text-gray-500">{p.minutesAgo}m</span>
                  </div>
                  <p className="mt-1 text-gray-800">{p.text}</p>
                  {p.evidenceCount ? (
                    <div className="mt-2 text-xs text-gray-600">{p.evidenceCount} evidence links</div>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <aside className="lg:col-span-4 space-y-4">
          <div className="rounded-lg border bg-white p-4">
            <div className="text-sm font-medium">Trends</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/motions/9001" className="hover:underline">
                  Retraining credits (Motion)
                </Link>
              </li>
              <li>
                <Link href="/issues/330" className="hover:underline">
                  Zoning reform (Issue)
                </Link>
              </li>
            </ul>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <div className="text-sm font-medium">Quick links</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li><Link href="/about" className="hover:underline">About MWV</Link></li>
              <li><Link href="/privacy" className="hover:underline">Privacy</Link></li>
              <li><Link href="/search" className="hover:underline">Search</Link></li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
