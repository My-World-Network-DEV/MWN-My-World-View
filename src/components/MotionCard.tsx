import React from 'react';
import StanceBar from './StanceBar';
import CardExpandable from './CardExpandable';
import CensusDonut from './CensusDonut';

type CensusCounts = { for: number; against: number; abstain: number };

export type MotionCardProps = {
  id?: string;
  title: string;
  issueTitle?: string;
  census?: { total: number; counts: CensusCounts } | null;
  evidenceCount?: number;
};

export default function MotionCard({ title, issueTitle, census, evidenceCount }: MotionCardProps) {
  const counts = census?.counts;
  const total = counts ? Math.max(1, counts.for + counts.against + counts.abstain) : 1;
  const forPct = counts ? Math.round((counts.for / total) * 100) : 0;
  const againstPct = counts ? Math.round((counts.against / total) * 100) : 0;
  const abstainPct = counts ? Math.round((counts.abstain / total) * 100) : 0;

  return (
    <CardExpandable
      header={(
        <header className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">{title}</div>
            {issueTitle && <div className="text-xs text-gray-500">{issueTitle}</div>}
          </div>
          <div className="text-right text-xs text-gray-600">
            <div>{census?.total ?? 0} responses</div>
          </div>
        </header>
      )}
      collapsed={counts ? (
        <div className="mt-3">
          <StanceBar counts={counts} labels={false} />
        </div>
      ) : null}
      expanded={counts ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="sm:col-span-2 space-y-2">
            <StanceBar counts={counts} />
            <div className="flex justify-between text-xs text-gray-600">
              <span>For {forPct}%</span>
              <span>Against {againstPct}%</span>
              <span>Abstain {abstainPct}%</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="pill" aria-label={`${evidenceCount ?? 0} evidences`}>Evidence {evidenceCount ?? 0}</span>
              <span className="pill">Comments 0</span>
              <span className="pill">Shares 0</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <CensusDonut counts={{ 1: againstPct, 2: 0, 3: abstainPct, 4: 0, 5: forPct }} />
          </div>
          <div className="sm:col-span-3 flex gap-2">
            <button className="rounded bg-mwv-accent px-3 py-2 text-sm text-white">Join stance</button>
            <button className="rounded border px-3 py-2 text-sm hover:bg-gray-50">Add your argument</button>
          </div>
        </div>
      ) : null}
    />
  );
}
