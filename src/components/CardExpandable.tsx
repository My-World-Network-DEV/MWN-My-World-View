"use client";
import React, { useEffect, useRef, useState } from 'react';

type Props = {
    header?: React.ReactNode;
    collapsed: React.ReactNode;
    expanded: React.ReactNode;
    defaultOpen?: boolean;
    className?: string;
};

export default function CardExpandable({ header, collapsed, expanded, defaultOpen, className }: Props) {
    const [open, setOpen] = useState(Boolean(defaultOpen));
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | 'auto'>(open ? 'auto' : 0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (open) {
            const next = el.scrollHeight;
            setHeight(next);
            const id = window.setTimeout(() => setHeight('auto'), 220);
            return () => window.clearTimeout(id);
        } else {
            setHeight(el.scrollHeight);
            requestAnimationFrame(() => setHeight(0));
        }
    }, [open]);

    return (
        <section className={`card card-hover p-4 ${className || ''}`}>
            {header}
            <div>{collapsed}</div>
            <button
                type="button"
                className="mt-2 text-sm text-blue-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-mwv-ring"
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setOpen((o) => !o);
                    }
                }}
            >
                {open ? 'Show less' : 'Read more…'}
            </button>
            <div
                ref={ref}
                style={{ maxHeight: height === 'auto' ? undefined : height, transition: 'max-height 220ms ease' }}
                className="overflow-hidden will-change-[max-height]"
                aria-hidden={!open}
            >
                <div className="pt-3">{expanded}</div>
            </div>
        </section>
    );
}


