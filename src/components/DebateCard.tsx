type Props = {
    id: string;
    title: string;
    phase: 'openings' | 'rebuttals' | 'cross' | 'closings' | 'archived';
    timeRemaining?: string;
    popularity?: number;
    onOpen?: (id: string) => void;
};

export default function DebateCard({ id, title, phase, timeRemaining, popularity, onOpen }: Props) {
    return (
        <article className="rounded-lg border bg-white p-4 hover:shadow-sm">
            <header className="flex items-center justify-between">
                <h3 className="font-medium">{title}</h3>
                <span className="text-xs text-gray-500">{phase}</span>
            </header>
            <div className="mt-1 text-xs text-gray-600">
                {timeRemaining ? <>Time left: {timeRemaining}</> : '—'}
                {typeof popularity === 'number' ? <span className="ml-2">Pop: {popularity}</span> : null}
            </div>
            <div className="mt-3">
                <button className="rounded border px-3 py-1 text-sm hover:bg-gray-50" onClick={() => onOpen?.(id)}>
                    Open
                </button>
            </div>
        </article>
    );
}


