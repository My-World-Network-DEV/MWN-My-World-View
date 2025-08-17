import React from 'react';

type Props = { counts: { 1?: number; 2?: number; 3?: number; 4?: number; 5?: number } };

export default function CensusDonut({ counts }: Props) {
    const total = Math.max(1, (counts[1] || 0) + (counts[2] || 0) + (counts[3] || 0) + (counts[4] || 0) + (counts[5] || 0));
    const colors = ['#dc2626', '#f97316', '#9ca3af', '#4ade80', '#22c55e'];
    const radii = { r: 18, R: 22 };
    let start = 0;
    const segs = [1, 2, 3, 4, 5].map((k, i) => {
        const val = counts[k as 1 | 2 | 3 | 4 | 5] || 0;
        const angle = (val / total) * Math.PI * 2;
        const end = start + angle;
        const large = angle > Math.PI ? 1 : 0;
        const x1 = 24 + radii.R * Math.cos(start);
        const y1 = 24 + radii.R * Math.sin(start);
        const x2 = 24 + radii.R * Math.cos(end);
        const y2 = 24 + radii.R * Math.sin(end);
        const path = `M ${x1} ${y1} A ${radii.R} ${radii.R} 0 ${large} 1 ${x2} ${y2} L ${24 + radii.r * Math.cos(end)} ${24 + radii.r * Math.sin(end)} A ${radii.r} ${radii.r} 0 ${large} 0 ${24 + radii.r * Math.cos(start)} ${24 + radii.r * Math.sin(start)} Z`;
        start = end;
        return { path, color: colors[i] };
    });
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" aria-label="Census donut">
            {segs.map((s, idx) => (
                <path key={idx} d={s.path} fill={s.color} />
            ))}
        </svg>
    );
}


