import React, { Suspense } from 'react';
import AppMenuBar from '@/components/AppMenuBar';
import Sidebar from '@/components/Sidebar';
import Card from '@/components/Card';
import Chip from '@/components/Chip';
import { SkeletonCard } from '@/components/Skeleton';
import Composer from '@/components/Composer';
import PostCard from '@/components/PostCard';
import HeaderHero from '@/components/HeaderHero';
import StanceBar from '@/components/StanceBar';
import FeedTabs from '@/components/FeedTabs';

type CensusCounts = { for: number; against: number; abstain: number };
type Post = {
  id: string;
  author: { name: string; handle: string; avatarUrl?: string };
  minutesAgo: number;
  text: string;
  evidenceCount?: number;
};
type MotionTrend = {
  title: string;
  counts: CensusCounts;
  total: number;
};
type TopicLite = { title: string };
type IssueLite = { title: string; motionCount: number };

const posts: Post[] = [
  {
    id: '1',
    author: { name: 'Tanual', handle: 'tanu' },
    minutesAgo: 2,
    text:
      'New proposals to decrease insecting renewable energy policy efficacy—counterfactuals suggest a 3–5y lag unless permitting is streamlined.',
    evidenceCount: 3,
  },
  {
    id: '2',
    author: { name: 'Ethel', handle: 'ethe' },
    minutesAgo: 9,
    text:
      'Support carbon pricing to develop economic impact buffers on agriculture. Suggest pairing with soil credits.',
  },
  {
    id: '3',
    author: { name: 'Enoel', handle: 'enl' },
    minutesAgo: 21,
    text:
      'Explore a steady revenue line through a circular reform—shift e-waste levies to upstream manufacturers.',
    evidenceCount: 1,
  },
];

const trending: MotionTrend[] = [
  { title: 'AI is essential for …', counts: { for: 62, against: 28, abstain: 10 }, total: 1204 },
  { title: 'Ban plastic bags in …', counts: { for: 54, against: 36, abstain: 10 }, total: 987 },
  { title: 'Universal basic income …', counts: { for: 39, against: 48, abstain: 13 }, total: 654 },
];

const suggestedTopics: TopicLite[] = [
  { title: 'Artificial intelligence' },
  { title: 'Renewable energy' },
  { title: 'Freedom of speech' },
  { title: 'Climate policy' },
  { title: 'Urban planning' },
  { title: 'Healthcare' },
];

const activeIssues: IssueLite[] = [
  { title: 'Regulate AI alignment', motionCount: 4 },
  { title: 'Plastic waste export bans', motionCount: 3 },
  { title: 'Cashless society risks', motionCount: 5 },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white">
      <AppMenuBar />
      <HeaderHero />
      <main className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12">
        <aside className="hidden space-y-4 lg:col-span-2 lg:block" aria-label="Sidebar and shortcuts">
          <Sidebar />
          <Card aria-label="Shortcuts">
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
          <Card aria-label="Quick Start">
            <div className="text-sm font-medium text-gray-800">Quick Start</div>
            <ol className="mt-2 list-decimal pl-4 text-sm text-gray-700">
              <li>Post a thought with a link</li>
              <li>Promote it into a Motion</li>
              <li>Watch the Census update</li>
            </ol>
          </Card>
        </aside>

        <section className="lg:col-span-8 space-y-5">
          <Suspense fallback={<div className="h-10" aria-hidden />}>
            <FeedTabs />
          </Suspense>
          <Card>
            <Composer />
            <div className="mt-3">
              <div className="flex gap-2 text-xs text-gray-600">
                <Chip>Attach evidence</Chip>
                <Chip>Quote a source</Chip>
                <Chip>Turn into motion</Chip>
              </div>
            </div>
          </Card>
          <ul className="space-y-3">
            {posts.map((p) => (
              <li key={p.id}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
          {/* Skeleton examples (could be conditional) */}
          <div className="hidden">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </section>

        <aside className="hidden space-y-4 lg:col-span-4 lg:block" aria-label="Trending motions and topics">
          <Card aria-label="Trending motions">
            <SectionTitle>Trending Motions</SectionTitle>
            <ul className="mt-3 space-y-3">
              {trending.map((m) => (
                <li key={m.title} className="space-y-1">
                  <div className="text-sm text-gray-800 line-clamp-1">{m.title}</div>
                  <StanceBar
                    forPct={m.counts.for}
                    againstPct={m.counts.against}
                    abstainPct={m.counts.abstain}
                  />
                  <div className="flex justify-between text-[11px] text-gray-600">
                    <span>
                      {m.counts.for}% · {m.counts.against}% · {m.counts.abstain}%
                    </span>
                    <span>{m.total} votes</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
          <Card aria-label="Suggested topics">
            <SectionTitle>Suggested Topics</SectionTitle>
            <ul className="mt-3 flex flex-wrap gap-2">
              {suggestedTopics.map((t) => (
                <li key={t.title}>
                  <button className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700 hover:bg-gray-100">
                    {t.title}
                  </button>
                </li>
              ))}
            </ul>
          </Card>
          <Card aria-label="Recently active issues">
            <SectionTitle>Recently Active Issues</SectionTitle>
            <ul className="mt-3 space-y-2">
              {activeIssues.map((i) => (
                <li key={i.title} className="flex justify-between text-sm text-gray-700">
                  <span className="line-clamp-1">{i.title}</span>
                  <span className="text-gray-500">Motions: {i.motionCount}</span>
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </main>
    </div>
  );
}

function SectionTitle({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm font-medium text-gray-800">{children}</div>
      {action}
    </div>
  );
}

// Chip moved to `src/components/Chip.tsx`
