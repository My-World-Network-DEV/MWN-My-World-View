import React from 'react';

type CensusCounts = { [key: string]: number };

export type MotionCardProps = {
  id?: string;
  title: string;
  issueTitle?: string;
  census?: { total: number; counts: CensusCounts } | null;
};

export default function MotionCard({ title, issueTitle, census }: MotionCardProps) {
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
      {census && (
        <div className="mt-3">
          <div className="text-xs text-gray-600">Breakdown:</div>
          <ul className="mt-2 flex gap-2 text-xs">
            {Object.entries(census.counts).map(([k, v]) => (
              <li key={k} className="rounded px-2 py-1 text-gray-700 ring-1 ring-gray-100">
                {k}: {v}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
