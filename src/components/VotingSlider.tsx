'use client';

type Props = { value?: number; onChange?: (v: number) => void; min?: number; max?: number; label?: string };

export default function VotingSlider({ value = 3, onChange, min = 1, max = 5, label = 'Vote' }: Props) {
    return (
        <div>
            <label className="text-sm font-medium">{label}: {value}</label>
            <input
                className="mt-1 w-full"
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange?.(Number(e.target.value))}
            />
        </div>
    );
}


