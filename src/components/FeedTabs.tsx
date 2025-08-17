"use client";
import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Chip from './Chip';

const tabs = ['For You', 'Following', 'Latest', 'Heated'] as const;

export default function FeedTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const tabParam = search.get('tab');
  const active = Math.max(0, tabs.findIndex((t) => t.toLowerCase().replace(/\s+/g, '-') === tabParam) ?? 0);
  const typesParam = new Set((search.get('types') ?? 'all').split(',').filter(Boolean));
  const toggleType = (type: string) => {
    const next = new Set(typesParam);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    if (next.size === 0) next.add('all');
    const params = new URLSearchParams(search.toString());
    params.set('types', Array.from(next).join(','));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const setTab = (idx: number) => {
    const slug = tabs[idx].toLowerCase().replace(/\s+/g, '-');
    const params = new URLSearchParams(search.toString());
    params.set('tab', slug);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="sticky top-0 z-10 -mt-2 bg-white/70 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div role="tablist" aria-label="Feed tabs" className="flex gap-2 overflow-x-auto">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            role="tab"
            aria-selected={active === idx}
            className={`rounded-full px-3 py-1.5 text-sm transition border ${active === idx
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            onClick={() => setTab(idx)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {['all', 'posts', 'motions'].map((t) => (
          <Chip key={t} selected={typesParam.has(t)} onClick={() => toggleType(t)}>
            {t[0].toUpperCase() + t.slice(1)}
          </Chip>
        ))}
      </div>
    </div>
  );
}
