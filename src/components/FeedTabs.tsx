"use client";
import React from 'react';

const tabs = ['For You', 'Following', 'Latest', 'Heated'] as const;

export default function FeedTabs() {
  const [active, setActive] = React.useState(0);
  return (
    <div className="sticky top-0 z-10 -mt-2 bg-white/70 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div role="tablist" aria-label="Feed tabs" className="flex gap-2">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            role="tab"
            aria-selected={active === idx}
            className={`rounded-full px-3 py-1.5 text-sm transition border ${
              active === idx
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setActive(idx)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
