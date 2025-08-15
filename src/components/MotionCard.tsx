import React from 'react';
import StanceBar from './StanceBar';

type CensusCounts = { for: number; against: number; abstain: number };

export type MotionCardProps = {
  id?: string;
  title: string;
  issueTitle?: string;
  census?: { total: number; counts: CensusCounts } | null;
};

export default function MotionCard({ title, issueTitle, census }: MotionCardProps) {
  const counts = census?.counts;
  const total = counts ? Math.max(1, counts.for + counts.against + counts.abstain) : 1;
  const forPct = counts ? Math.round((counts.for / total) * 100) : 0;
  const againstPct = counts ? Math.round((counts.against / total) * 100) : 0;
  const abstainPct = counts ? Math.round((counts.abstain / total) * 100) : 0;

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          {issueTitle && <div className="text-xs text-gray-500">{issueTitle}</div>}
        </div>
        <div className="text-right text-xs text-gray-600">
          <div>{census?.total ?? 0} responses</div>
        </div>
      </div>
      {counts && (
        <div className="mt-3 space-y-1">
          <StanceBar forPct={forPct} againstPct={againstPct} abstainPct={abstainPct} />
          <div className="flex justify-between text-xs text-gray-600">
            <span>{forPct}%</span>
            <span>{againstPct}%</span>
            <span>{abstainPct}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
