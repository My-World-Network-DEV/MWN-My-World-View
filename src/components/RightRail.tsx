"use client";
import StanceBar from './StanceBar';
import SectionTitle from './SectionTitle';

export default function RightRail() {
  const suggestedTopics = [
    { title: 'Artificial intelligence' },
    { title: 'Renewable energy' },
    { title: 'Freedom of speech' },
  ];

  const trending = [
    { title: 'AI is essential for …', counts: { for: 62, against: 28, abstain: 10 } },
    { title: 'Ban plastic bags in …', counts: { for: 54, against: 36, abstain: 10 } },
    { title: 'Universal basic income …', counts: { for: 39, against: 48, abstain: 13 } },
  ];

  return (
    <aside className="space-y-4 lg:col-span-4 xl:col-span-3">
      <div className="card p-4">
        <SectionTitle>Suggested Topics</SectionTitle>
        <ul className="mt-4 flex flex-wrap gap-2 text-sm">
          {suggestedTopics.map((t) => (
            <li key={t.title}>
              <button className="rounded-full border border-mwv-border bg-mwv-muted px-3 py-1 hover:bg-mwv-border/30">
                {t.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="card p-4">
        <SectionTitle>Trending Motions</SectionTitle>
        <ul className="mt-4 space-y-4">
          {trending.map((m) => {
            const total = m.counts.for + m.counts.against + m.counts.abstain;
            const forPct = Math.round((m.counts.for / total) * 100);
            const againstPct = Math.round((m.counts.against / total) * 100);
            const abstainPct = Math.round((m.counts.abstain / total) * 100);
            return (
              <li key={m.title} className="space-y-2">
                <div className="text-sm text-gray-800 line-clamp-1">{m.title}</div>
                <StanceBar counts={m.counts} size="sm" labels={false} />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>For {forPct}%</span>
                  <span>Against {againstPct}%</span>
                  <span>Abstain {abstainPct}%</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
 
