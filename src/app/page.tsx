import TopNav from '@/components/TopNav';
import Sidebar from '@/components/Sidebar';
import Composer from '@/components/Composer';
import PostCard from '@/components/PostCard';
import RightRail from '@/components/RightRail';

type Post = {
  id: string;
  author: { name: string; handle: string; avatarUrl?: string };
  minutesAgo: number;
  text: string;
  evidenceCount?: number;
  topic?: string;
};

const posts: Post[] = [
  {
    id: '1',
    author: { name: 'Tanual', handle: 'tanu' },
    minutesAgo: 2,
    text:
      'New proposals to decrease insecting renewable energy policy efficacy—counterfactuals suggest a 3–5y lag unless permitting is streamlined.',
    evidenceCount: 3,
    topic: 'Climate Change',
  },
  {
    id: '2',
    author: { name: 'Ethel', handle: 'ethe' },
    minutesAgo: 9,
    text:
      'Support carbon pricing to develop economic impact buffers on agriculture. Suggest pairing with soil credits.',
    topic: 'Economics',
  },
  {
    id: '3',
    author: { name: 'Enoel', handle: 'enl' },
    minutesAgo: 21,
    text:
      'Explore a steady revenue line through a circular reform—shift e-waste levies to upstream manufacturers.',
    evidenceCount: 1,
    topic: 'Policy',
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white">
      <TopNav />

      {/* Hero header */}
      <HeaderHero />

      <main className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12">
        {/* Left rail */}
        <aside className="lg:col-span-2 xl:col-span-2 space-y-4">
          <Sidebar />
          <Card>
            <div className="text-sm font-medium text-gray-800">Shortcuts</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span>My Drafts</span>
                <kbd className="rounded border bg-gray-50 px-1.5 text-xs text-gray-600">D</kbd>
              </li>
              <li className="flex items-center justify-between">
                <span>Start a Motion</span>
                <kbd className="rounded border bg-gray-50 px-1.5 text-xs text-gray-600">M</kbd>
              </li>
              <li className="flex items-center justify-between">
                <span>Browse Issues</span>
                <kbd className="rounded border bg-gray-50 px-1.5 text-xs text-gray-600">I</kbd>
              </li>
            </ul>
          </Card>
        </aside>

        {/* Main feed */}
        <section className="lg:col-span-7 xl:col-span-7 space-y-5">
          {/* Tabs (static for now) */}
          <div className="sticky top-0 z-10 -mt-2 bg-white/70 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="flex gap-2">
              <button className="rounded-full px-3 py-1.5 text-sm transition border bg-gray-900 text-white border-gray-900">For You</button>
              <button className="rounded-full px-3 py-1.5 text-sm transition border bg-white text-gray-700 border-gray-200 hover:bg-gray-50">Following</button>
              <button className="rounded-full px-3 py-1.5 text-sm transition border bg-white text-gray-700 border-gray-200 hover:bg-gray-50">Latest</button>
            </div>
          </div>

          {/* Composer in card */}
          <Card>
            <Composer />
            <div className="mt-3 flex items-center justify-between">
              <div className="flex gap-2 text-xs text-gray-600">
                <Chip>Attach</Chip>
                <Chip>Quote</Chip>
                <Chip>Poll</Chip>
              </div>
            </div>
          </Card>

          {/* Feed */}
          <ul className="space-y-3">
            {posts.map((p) => (
              <li key={p.id}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </section>

        {/* Right rail */}
        <aside className="lg:col-span-3 xl:col-span-3 space-y-4">
          <RightRail />
          <PromoCard />
        </aside>
      </main>
    </div>
  );
}

function HeaderHero() {
  return (
    <div className="relative overflow-hidden border-b bg-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.10),transparent_55%),radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.10),transparent_55%)]" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Home</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-600">
              A clean, evidence-first feed. Compose quickly, promote to Issues or Motions, and see stance trends.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50">New Topic</button>
            <button className="rounded-lg bg-gray-900 px-3 py-2 text-sm text-white hover:bg-black">Start Motion</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow">
      {children}
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-700">
      {children}
    </span>
  );
}

function PromoCard() {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-emerald-50 p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-white shadow-sm ring-1 ring-gray-200 flex items-center justify-center">💡</div>
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900">Tip: Evidence-first</div>
          <div className="text-sm text-gray-700">
            Paste links in your post—MWV will auto-fetch titles and domains for Evidence cards.
          </div>
        </div>
      </div>
      <div className="mt-3 text-right">
        <button className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm hover:bg-gray-50">Learn more</button>
      </div>
    </section>
  );
}
