import React from 'react';
import StanceBar from './StanceBar';

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
    <article className="card card-hover p-4">
      <header className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          {issueTitle && <div className="text-xs text-gray-500">{issueTitle}</div>}
        </div>
        <div className="text-right text-xs text-gray-600">
          <div>{census?.total ?? 0} responses</div>
        </div>
      </header>
      {counts && (
        <div className="mt-4 space-y-2">
          <StanceBar counts={counts} />
          <div className="flex justify-between text-xs text-gray-600">
            <span>For {forPct}%</span>
            <span>Against {againstPct}%</span>
            <span>Abstain {abstainPct}%</span>
          </div>
        </div>
      )}
      {typeof evidenceCount === 'number' && (
        <div className="mt-4">
          <span className="pill" aria-label={`${evidenceCount} pieces of evidence`}>
            Evidence · {evidenceCount}
          </span>
        </div>
      )}
    </article>
  );
}
