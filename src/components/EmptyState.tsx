import React from 'react';

type Props = {
    title: string;
    body?: string;
    primaryAction?: { href: string; label: string };
    docsHref?: string;
};

export default function EmptyState({ title, body, primaryAction, docsHref }: Props) {
    return (
        <div className="card p-6 text-center">
            <div className="text-sm font-medium">{title}</div>
            {body && <p className="mt-2 text-[13px]/[20px] text-black/70">{body}</p>}
            <div className="mt-3 flex items-center justify-center gap-3">
                {primaryAction && (
                    <a href={primaryAction.href} className="rounded bg-mwv-accent px-3 py-2 text-sm text-white">
                        {primaryAction.label}
                    </a>
                )}
                {docsHref && (
                    <a href={docsHref} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">
                        Learn more
                    </a>
                )}
            </div>
        </div>
    );
}


