import React from 'react';
import Link from 'next/link';
import { FileEdit, Zap, Search } from 'lucide-react';

export default function QuickActions() {
    const items = [
        { href: '/posts/new', label: 'Draft Post', Icon: FileEdit },
        { href: '/motions/new', label: 'Start Motion', Icon: Zap },
        { href: '/issues', label: 'Browse Issues', Icon: Search },
    ];
    return (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {items.map(({ href, label, Icon }) => (
                <Link key={href} href={href} className="card p-3 text-sm hover:shadow-card-hover inline-flex items-center justify-center gap-2">
                    <Icon className="size-4" aria-hidden />
                    <span>{label}</span>
                </Link>
            ))}
        </div>
    );
}


