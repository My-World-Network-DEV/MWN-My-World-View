'use client';

import { useState } from 'react';

type Toast = { id: string; text: string };
export default function ToastManager() {
    const [toasts, _setToasts] = useState<Toast[]>([]);
    // TODO: expose global add/remove via context/event
    return (
        <div className="fixed bottom-4 right-4 space-y-2">
            {toasts.map((t) => (
                <div key={t.id} className="rounded bg-black/80 px-3 py-2 text-sm text-white shadow-card">
                    {t.text}
                </div>
            ))}
        </div>
    );
}


