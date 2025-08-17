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
    onSegmentClick?: never;
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
    onSegmentClick?: never;
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
    onSegmentClick?: (level: 1 | 2 | 3 | 4 | 5) => void;
    trendDelta?: { 1?: number; 2?: number; 3?: number; 4?: number; 5?: number };
    variant?: 'dense' | 'full';
  };

export default function StanceBar(props: StanceBarProps) {
  const size = ('size' in props && props.size) || 'md';
  const labels = !('labels' in props) || props.labels !== false;
  const height = { sm: 'h-2', md: 'h-3', lg: 'h-4' }[size];
  const barClass = `flex ${height} w-full overflow-hidden rounded bg-mwv-muted`;
  const stanceColors = ['#dc2626', '#f97316', '#9ca3af', '#4ade80', '#22c55e'];

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
      return <div className={`${barClass} items-center justify-center text-[11px] italic text-gray-500`}>No stances yet</div>;
    }
    if ((props as any).variant === 'dense') {
      const pFor = p4 + p5;
      const pAgainst = p1 + p2;
      const pNeutral = p3;
      return (
        <div className={`flex ${height} w-56 overflow-hidden rounded`} role="img" aria-label="Mini stance distribution">
          <div style={{ width: `${pFor}%`, backgroundColor: '#22c55e' }} title={`For ${pFor}%`} />
          <div style={{ width: `${pNeutral}%`, backgroundColor: '#9ca3af' }} title={`Neutral ${pNeutral}%`} />
          <div style={{ width: `${pAgainst}%`, backgroundColor: '#ef4444' }} title={`Against ${pAgainst}%`} />
        </div>
      );
    }
    return (
      <div className="w-full">
        <div className={barClass} role="img" aria-label="Stance distribution (1 to 5)">
          <button style={{ width: `${p1}%`, backgroundColor: stanceColors[0] }} className="h-full" title={`1 Strongly Disagree ${p1}% (${c.counts[1] || 0})`} aria-label={`1 Strongly Disagree ${p1}% (${c.counts[1] || 0})`} onClick={(props as any).onSegmentClick ? () => (props as any).onSegmentClick(1) : undefined} />
          <button style={{ width: `${p2}%`, backgroundColor: stanceColors[1] }} className="h-full" title={`2 Disagree ${p2}% (${c.counts[2] || 0})`} aria-label={`2 Disagree ${p2}% (${c.counts[2] || 0})`} onClick={(props as any).onSegmentClick ? () => (props as any).onSegmentClick(2) : undefined} />
          <button style={{ width: `${p3}%`, backgroundColor: stanceColors[2] }} className="h-full" title={`3 Neutral ${p3}% (${c.counts[3] || 0})`} aria-label={`3 Neutral ${p3}% (${c.counts[3] || 0})`} onClick={(props as any).onSegmentClick ? () => (props as any).onSegmentClick(3) : undefined} />
          <button style={{ width: `${p4}%`, backgroundColor: stanceColors[3] }} className="h-full" title={`4 Agree ${p4}% (${c.counts[4] || 0})`} aria-label={`4 Agree ${p4}% (${c.counts[4] || 0})`} onClick={(props as any).onSegmentClick ? () => (props as any).onSegmentClick(4) : undefined} />
          <button style={{ width: `${p5}%`, backgroundColor: stanceColors[4] }} className="h-full" title={`5 Strongly Agree ${p5}% (${c.counts[5] || 0})`} aria-label={`5 Strongly Agree ${p5}% (${c.counts[5] || 0})`} onClick={(props as any).onSegmentClick ? () => (props as any).onSegmentClick(5) : undefined} />
        </div>
        {labels && (
          <div className="mt-1 text-xs text-mwv-muted">
            <div className="grid grid-cols-5">
              <div className="text-left">1: {c.counts[1] || 0} ({p1}%)</div>
              <div className="text-left">2: {c.counts[2] || 0} ({p2}%)</div>
              <div className="text-center">3: {c.counts[3] || 0} ({p3}%)</div>
              <div className="text-right">4: {c.counts[4] || 0} ({p4}%)</div>
              <div className="text-right">5: {c.counts[5] || 0} ({p5}%)</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if ('counts' in props && props.counts) {
    const counts = props.counts;
    const forCount = counts.for || 0;
    const againstCount = counts.against || 0;
    const abstainCount = counts.abstain || 0;
    const total = Math.max(1, forCount + againstCount + abstainCount);
    const pct = (n: number) => Math.round((n / total) * 100);
    return (
      <div className="w-full">
        <div className={barClass} role="img" aria-label="Stance distribution">
          <div style={{ width: `${pct(forCount)}%`, backgroundColor: '#22c55e' }} title={`For ${pct(forCount)}% (${forCount})`} aria-label={`For ${pct(forCount)}% (${forCount})`} />
          <div style={{ width: `${pct(againstCount)}%`, backgroundColor: '#ef4444' }} title={`Against ${pct(againstCount)}% (${againstCount})`} aria-label={`Against ${pct(againstCount)}% (${againstCount})`} />
          <div style={{ width: `${pct(abstainCount)}%`, backgroundColor: '#9ca3af' }} title={`Abstain ${pct(abstainCount)}% (${abstainCount})`} aria-label={`Abstain ${pct(abstainCount)}% (${abstainCount})`} />
        </div>
        {labels && (
          <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
            <div>For: {forCount} ({pct(forCount)}%)</div>
            <div>Against: {againstCount} ({pct(againstCount)}%)</div>
            <div>Abstain: {abstainCount} ({pct(abstainCount)}%)</div>
          </div>
        )}
      </div>
    );
  }

  if ('forPct' in props) {
    const { forPct, againstPct, abstainPct } = props;
    return (
      <div className={barClass} role="img" aria-label="Stance distribution">
        <div className="h-full" style={{ width: `${forPct || 0}%`, backgroundColor: '#22c55e' }} title={`For ${forPct || 0}%`} aria-label={`For ${forPct || 0}%`} />
        <div className="h-full" style={{ width: `${againstPct || 0}%`, backgroundColor: '#ef4444' }} title={`Against ${againstPct || 0}%`} aria-label={`Against ${againstPct || 0}%`} />
        <div className="h-full" style={{ width: `${abstainPct || 0}%`, backgroundColor: '#9ca3af' }} title={`Abstain ${abstainPct || 0}%`} aria-label={`Abstain ${abstainPct || 0}%`} />
      </div>
    );
  }

  return null;
}
