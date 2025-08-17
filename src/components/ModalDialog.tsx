'use client';

import { useEffect, useRef } from 'react';

type Props = { open: boolean; title?: string; onClose: () => void; children: React.ReactNode };

export default function ModalDialog({ open, title, onClose, children }: Props) {
    const ref = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const d = ref.current;
        if (!d) return;
        if (open && !d.open) d.showModal();
        if (!open && d.open) d.close();
    }, [open]);
    return (
        <dialog ref={ref} className="rounded-xl p-0" onClose={onClose}>
            <div className="w-full max-w-lg rounded-xl border bg-white p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium">{title}</h2>
                    <button className="rounded px-2 py-1 text-sm hover:bg-gray-50" onClick={onClose}>Close</button>
                </div>
                <div className="mt-3">{children}</div>
            </div>
        </dialog>
    );
}


