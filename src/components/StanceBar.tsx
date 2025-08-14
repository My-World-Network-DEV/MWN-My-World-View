export type StanceCounts = { for?: number; against?: number; abstain?: number };
export type StanceBarProps = { forPct?: number; againstPct?: number; abstainPct?: number; counts?: StanceCounts };

export default function StanceBar({ forPct, againstPct, abstainPct, counts }: StanceBarProps) {
  if (counts) {
    const forCount = counts.for || 0;
    const againstCount = counts.against || 0;
    const abstainCount = counts.abstain || 0;
    const total = Math.max(1, forCount + againstCount + abstainCount);
    const _pct = (n: number) => Math.round((n / total) * 100);
    return (
      <div className="w-full">
        <div className="flex h-3 w-full overflow-hidden rounded bg-gray-100">
          <div style={{ width: `${_pct(forCount)}%` }} className="bg-emerald-500" />
          <div style={{ width: `${_pct(againstCount)}%` }} className="bg-rose-500" />
          <div style={{ width: `${_pct(abstainCount)}%` }} className="bg-yellow-400" />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
          <div>For: {forCount}</div>
          <div>Against: {againstCount}</div>
          <div>Abstain: {abstainCount}</div>
        </div>
      </div>
    );
  }
  // Percentage mode

  return (
    <div className="h-2.5 w-full overflow-hidden rounded bg-gray-200 flex" role="img" aria-label="Stance distribution">
      <div className="h-full bg-emerald-500" style={{ width: `${forPct || 0}%` }} aria-label={`For ${forPct || 0}%`} />
      <div className="h-full bg-rose-500" style={{ width: `${againstPct || 0}%` }} aria-label={`Against ${againstPct || 0}%`} />
      <div className="h-full bg-gray-500" style={{ width: `${abstainPct || 0}%` }} aria-label={`Abstain ${abstainPct || 0}%`} />
    </div>
  );
}
