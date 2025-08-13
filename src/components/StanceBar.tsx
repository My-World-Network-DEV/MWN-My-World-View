import React from 'react';

export type StanceBarProps = {
  counts: { for?: number; against?: number; abstain?: number };
};

export default function StanceBar({ counts }: StanceBarProps) {
  const forCount = counts.for || 0;
  const againstCount = counts.against || 0;
  const abstainCount = counts.abstain || 0;
  const total = Math.max(1, forCount + againstCount + abstainCount);
  const pct = (n: number) => Math.round((n / total) * 100);

  return (
    <div className="w-full">
      <div className="flex h-3 w-full overflow-hidden rounded bg-gray-100">
        <div style={{ width: `${pct(forCount)}%` }} className="bg-emerald-500" />
        <div style={{ width: `${pct(againstCount)}%` }} className="bg-rose-500" />
        <div style={{ width: `${pct(abstainCount)}%` }} className="bg-yellow-400" />
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
        <div>For: {forCount}</div>
        <div>Against: {againstCount}</div>
        <div>Abstain: {abstainCount}</div>
      </div>
    </div>
  );
}
