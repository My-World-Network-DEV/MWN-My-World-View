"use client";
import StanceBar from './StanceBar';

export default function RightRail() {
  const suggestedTopics = [
    { title: 'Artificial intelligence' },
    { title: 'Renewable energy' },
    { title: 'Freedom of speech' },
  ];

  const trending = [
    { title: 'AI is essential for …', forPct: 62, againstPct: 28, abstainPct: 10 },
    { title: 'Ban plastic bags in …', forPct: 54, againstPct: 36, abstainPct: 10 },
    { title: 'Universal basic income …', forPct: 39, againstPct: 48, abstainPct: 13 },
  ];

  return (
    <aside className="lg:col-span-4 xl:col-span-3 space-y-4">
      <div className="rounded-lg border bg-white p-4">
        <div className="text-sm font-medium">Suggested Topics</div>
        <ul className="mt-3 space-y-2 text-sm">
          {suggestedTopics.map((t) => (
            <li key={t.title}>
              <button className="flex w-full items-center justify-between rounded-md px-2 py-1 hover:bg-gray-50">
                <span>{t.title}</span>
                <span className="text-gray-400">›</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border bg-white p-4">
        <div className="text-sm font-medium">Trending Motions</div>
        <ul className="mt-3 space-y-3">
          {trending.map((m) => (
            <li key={m.title} className="space-y-1">
              <div className="text-sm text-gray-800 line-clamp-1">{m.title}</div>
              <StanceBar forPct={m.forPct} againstPct={m.againstPct} abstainPct={m.abstainPct} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
 
