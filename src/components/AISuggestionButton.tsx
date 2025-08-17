'use client';

export default function AISuggestionButton({ onClick }: { onClick: () => void }) {
    return (
        <button className="rounded border px-3 py-1 text-sm hover:bg-gray-50" onClick={onClick}>
            AI Suggestion
        </button>
    );
}


