'use client';

export default function ModerationFlag({ onFlag }: { onFlag?: () => void }) {
    return (
        <button className="rounded border px-2 py-1 text-xs hover:bg-gray-50" onClick={onFlag}>
            Flag
        </button>
    );
}


