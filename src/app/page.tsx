import React, { Suspense } from 'react';
import Link from 'next/link';
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

async function getHomeData() {
  try {
    const res = await fetch('/api/home', { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function Page() {
  const data = await getHomeData();
  const posts = data?.posts ?? [];
  const trending = data?.trending ?? [];
  const suggestedTopics = data?.suggestedTopics ?? [];
  const activeIssues = data?.activeIssues ?? [];
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white">
      <AppMenuBar />
      <HeaderHero />
      <main className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12">
        <aside className="hidden space-y-4 lg:col-span-2 lg:block" aria-label="Global navigation">
          <Sidebar />
        </aside>

        <section className="lg:col-span-8 space-y-5">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <a href="#composer" className="card p-3 text-sm hover:shadow-card-hover">Draft a Post</a>
            <Link href="/motions/new" className="card p-3 text-sm hover:shadow-card-hover">Start a Motion</Link>
            <Link href="/issues" className="card p-3 text-sm hover:shadow-card-hover">Browse Issues</Link>
          </div>
          <Card id="composer">
            <Composer />
            <div className="mt-3">
              <div className="flex gap-2 text-xs text-gray-600">
                <Chip>Attach evidence</Chip>
                <Chip>Quote a source</Chip>
                <Chip>Turn into motion</Chip>
              </div>
            </div>
          </Card>
          <Suspense fallback={<div className="h-10" aria-hidden />}>
            <FeedTabs />
          </Suspense>
          <ul className="space-y-3">
            {posts.length === 0 && (
              <li>
                <SkeletonCard />
              </li>
            )}
            {posts.map((p: { id: string; author: { name: string; handle: string; avatarUrl?: string }; minutesAgo: number; text: string; evidenceCount?: number }) => (
              <li key={p.id}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
          <details className="card p-4">
            <summary className="cursor-pointer list-none text-sm font-medium">Quick Start</summary>
            <ol className="mt-2 list-decimal pl-4 text-sm text-gray-700">
              <li>Post a thought with a link</li>
              <li>Promote it into a Motion</li>
              <li>Watch the Census update</li>
            </ol>
          </details>
        </section>

        <aside className="hidden space-y-4 lg:col-span-4 lg:block" aria-label="Trending motions and topics">
          <Card aria-label="Trending motions">
            <SectionTitle>Trending Motions</SectionTitle>
            <ul className="mt-3 space-y-3">
              {trending.map((m: { title: string; counts: { for: number; against: number; abstain: number }; total: number }) => (
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
              {suggestedTopics.map((t: { title: string }) => (
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
              {activeIssues.map((i: { title: string; motionCount: number }) => (
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
