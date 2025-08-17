import React from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
    return <div className={`animate-pulse rounded-md bg-mwv-muted ${className}`} aria-hidden />;
}

export function SkeletonCard() {
    return (
        <div className="rounded-xl border border-mwv-border bg-mwv-card p-4 shadow-card">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="mt-3 h-3 w-full" />
            <Skeleton className="mt-2 h-3 w-5/6" />
            <Skeleton className="mt-2 h-3 w-2/3" />
        </div>
    );
}


