'use client';

import { useState } from 'react';

export default function CreateWizard({ steps }: { steps: string[] }) {
    const [i, setI] = useState(0);
    return (
        <div className="rounded-lg border bg-white p-4">
            <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Step {i + 1} of {steps.length}</div>
                <div className="text-sm">{steps[i]}</div>
            </div>
            <div className="mt-3 rounded border bg-gray-50 p-4 text-sm text-gray-600">Content placeholder</div>
            <div className="mt-3 flex justify-between">
                <button className="rounded border px-3 py-1 text-sm hover:bg-gray-50" onClick={() => setI((n) => Math.max(0, n - 1))}>Back</button>
                <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white" onClick={() => setI((n) => Math.min(steps.length - 1, n + 1))}>Next</button>
            </div>
        </div>
    );
}


