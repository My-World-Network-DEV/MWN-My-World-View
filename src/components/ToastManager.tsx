'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

export type ToastVariant = 'success' | 'error' | 'info';
export type Toast = { id: string; title?: string; text: string; variant?: ToastVariant; durationMs?: number };

type ToastContextValue = {
    add: (toast: Omit<Toast, 'id'>) => string;
    remove: (id: string) => void;
    clear: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
    return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const timeouts = useRef<Record<string, number>>({});

    const remove = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        const handle = timeouts.current[id];
        if (handle) {
            window.clearTimeout(handle);
            delete timeouts.current[id];
        }
    }, []);

    const add = useCallback((t: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).slice(2);
        const toast: Toast = { id, durationMs: 4000, variant: 'info', ...t };
        setToasts((prev) => [...prev, toast]);
        const handle = window.setTimeout(() => remove(id), toast.durationMs);
        timeouts.current[id] = handle as unknown as number;
        return id;
    }, [remove]);

    const clear = useCallback(() => {
        Object.values(timeouts.current).forEach((h) => window.clearTimeout(h));
        timeouts.current = {};
        setToasts([]);
    }, []);

    const value = useMemo(() => ({ add, remove, clear }), [add, remove, clear]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="fixed bottom-4 right-4 z-[100] space-y-2">
                {toasts.map((t) => (
                    <ToastItem key={t.id} toast={t} onClose={() => remove(t.id)} />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
    const color = toast.variant === 'success' ? 'bg-mwv-success' : toast.variant === 'error' ? 'bg-mwv-error' : 'bg-gray-900';
    return (
        <div className={`pointer-events-auto w-80 overflow-hidden rounded-md text-white shadow-card`}>
            <div className={`${color} px-3 py-2`}>
                <div className="flex items-start gap-2">
                    <div className="flex-1">
                        {toast.title && <div className="text-sm font-medium">{toast.title}</div>}
                        <div className="text-sm opacity-95">{toast.text}</div>
                    </div>
                    <button className="rounded px-2 text-sm/none opacity-80 hover:opacity-100" aria-label="Close" onClick={onClose}>×</button>
                </div>
            </div>
        </div>
    );
}

export default function ToastManager() {
    // Backward export if someone imports default; recommends using <ToastProvider>
    return null;
}



