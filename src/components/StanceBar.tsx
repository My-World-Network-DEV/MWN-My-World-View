export type StanceCounts3 = { for?: number; against?: number; abstain?: number };
export type Census5 = {
  counts: { 1?: number; 2?: number; 3?: number; 4?: number; 5?: number };
  total: number;
  percentages?: { 1?: number; 2?: number; 3?: number; 4?: number; 5?: number };
};
export type StanceBarProps =
  | {
    // Legacy 3-way percentage mode
    forPct: number;
    againstPct: number;
    abstainPct: number;
    counts?: never;
    census5?: never;
    size?: 'sm' | 'md' | 'lg';
    labels?: boolean;
    compact?: boolean;
  }
  | {
    // Legacy 3-way counts mode
    counts: StanceCounts3;
    forPct?: never;
    againstPct?: never;
    abstainPct?: never;
    census5?: never;
    size?: 'sm' | 'md' | 'lg';
    labels?: boolean;
    compact?: boolean;
  }
  | {
    // New 5-band census mode
    census5: Census5;
    forPct?: never;
    againstPct?: never;
    abstainPct?: never;
    counts?: never;
    size?: 'sm' | 'md' | 'lg';
    labels?: boolean;
    compact?: boolean;
  };

export default function StanceBar(props: StanceBarProps) {
  const size = ('size' in props && props.size) || 'md';
  const labels = !('labels' in props) || props.labels !== false;
  const height = { sm: 'h-2', md: 'h-3', lg: 'h-4' }[size];
  const barClass = `flex ${height} w-full overflow-hidden rounded bg-mwv-muted`;
  // New 5-band mode
  if ('census5' in props && props.census5) {
    const c = props.census5;
    const total = Math.max(1, c.total || 0);
    const pct = (n?: number) => Math.round(((n || 0) / total) * 100);
    const p1 = c.percentages?.[1] ?? pct(c.counts[1]);
    const p2 = c.percentages?.[2] ?? pct(c.counts[2]);
    const p3 = c.percentages?.[3] ?? pct(c.counts[3]);
    const p4 = c.percentages?.[4] ?? pct(c.counts[4]);
    const p5 = c.percentages?.[5] ?? pct(c.counts[5]);
    const hasAny = (c.counts[1] || c.counts[2] || c.counts[3] || c.counts[4] || c.counts[5]) ?? 0;
    if (!hasAny) {
      return <div className={`${barClass} items-center justify-center text-[11px] text-gray-500`}>No stances yet</div>;
    }
    return (
      <div className="w-full">
        <div className={barClass} role="img" aria-label="Stance distribution (1 to 5)">
          <div style={{ width: `${p1}%` }} className="bg-rose-600" aria-label={`1 Strongly Disagree ${p1}%`} />
          <div style={{ width: `${p2}%` }} className="bg-orange-500" aria-label={`2 Disagree ${p2}%`} />
          <div style={{ width: `${p3}%` }} className="bg-gray-500" aria-label={`3 Neutral ${p3}%`} />
          <div style={{ width: `${p4}%` }} className="bg-emerald-400" aria-label={`4 Agree ${p4}%`} />
          <div style={{ width: `${p5}%` }} className="bg-emerald-600" aria-label={`5 Strongly Agree ${p5}%`} />
        </div>
        {labels && (
          <div className="mt-2 grid grid-cols-5 text-[11px] text-gray-600">
            <div className="text-left">1: {c.counts[1] || 0}</div>
            <div className="text-left">2: {c.counts[2] || 0}</div>
            <div className="text-center">3: {c.counts[3] || 0}</div>
            <div className="text-right">4: {c.counts[4] || 0}</div>
            <div className="text-right">5: {c.counts[5] || 0}</div>
          </div>
        )}
      </div>
    );
  }
  // Legacy 3-way counts mode
  if ('counts' in props && props.counts) {
    const counts = props.counts;
    const forCount = counts.for || 0;
    const againstCount = counts.against || 0;
    const abstainCount = counts.abstain || 0;
    const total = Math.max(1, forCount + againstCount + abstainCount);
    const _pct = (n: number) => Math.round((n / total) * 100);
    return (
      <div className="w-full">
        <div className={barClass}>
          <div style={{ width: `${_pct(forCount)}%` }} className="bg-emerald-500" />
          <div style={{ width: `${_pct(againstCount)}%` }} className="bg-rose-500" />
          <div style={{ width: `${_pct(abstainCount)}%` }} className="bg-yellow-400" />
        </div>
        {labels && (
          <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
            <div>For: {forCount}</div>
            <div>Against: {againstCount}</div>
            <div>Abstain: {abstainCount}</div>
          </div>
        )}
      </div>
    );
  }
  // Percentage mode
  if ('forPct' in props) {
    const { forPct, againstPct, abstainPct } = props;
    return (
      <div className={barClass} role="img" aria-label="Stance distribution">
        <div className="h-full bg-emerald-500" style={{ width: `${forPct || 0}%` }} aria-label={`For ${forPct || 0}%`} />
        <div className="h-full bg-rose-500" style={{ width: `${againstPct || 0}%` }} aria-label={`Against ${againstPct || 0}%`} />
        <div className="h-full bg-gray-500" style={{ width: `${abstainPct || 0}%` }} aria-label={`Abstain ${abstainPct || 0}%`} />
      </div>
    );
  }
  return null;
}
