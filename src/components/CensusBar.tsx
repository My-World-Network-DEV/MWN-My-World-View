type Props = { distribution: [number, number, number, number, number]; showLabels?: boolean };

export default function CensusBar({ distribution, showLabels = true }: Props) {
    const total = Math.max(1, distribution.reduce((a, b) => a + b, 0));
    const pct = (n: number) => Math.round((n / total) * 100);
    const colors = ['bg-rose-500', 'bg-orange-500', 'bg-gray-500', 'bg-sky-500', 'bg-emerald-500'];
    return (
        <div>
            <div className="flex h-3 w-full overflow-hidden rounded bg-gray-200">
                {distribution.map((n, i) => (
                    <div key={i} className={colors[i]} style={{ width: `${pct(n)}%` }} />
                ))}
            </div>
            {showLabels && (
                <div className="mt-1 text-xs text-gray-600">
                    {distribution.map((n, i) => (
                        <span key={i} className="mr-2">
                            {i + 1}: {pct(n)}%
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}


