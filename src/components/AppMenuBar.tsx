"use client";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, Bell, Search, Plus, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const sections = [
    { key: 'topics', label: 'Topics', paths: ['/my/topics', '/topics', '/topics/new'] },
    { key: 'issues', label: 'Issues', paths: ['/my/issues', '/issues', '/issues/new'] },
    { key: 'motions', label: 'Motions', paths: ['/my/motions', '/motions', '/motions/new'] },
    { key: 'positions', label: 'Positions', paths: ['/my/positions', '/positions', '/positions/new'] },
    { key: 'debates', label: 'Debates', paths: ['/my/debates', '/debates', '/debates/new'] },
    { key: 'solutions', label: 'Solutions', paths: ['/my/solutions', '/solutions', '/solutions/new'] },
];

export default function AppMenuBar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    return (
        <header className="sticky top-0 z-30 w-full border-b border-mwv-border bg-mwv-card/80 backdrop-blur">
            <div className="container mx-auto flex items-center gap-3 px-4 py-3">
                <button className="md:hidden rounded p-2 hover:bg-mwv-muted" aria-label="Open menu" onClick={() => setMobileOpen((o) => !o)}>
                    <Menu className="size-5" />
                </button>
                <Link href="/" className="font-bold text-lg tracking-tight">MWV</Link>
                <nav className="hidden md:flex items-center gap-3 text-sm">
                    {sections.map((s) => (
                        <DropdownMenu.Root key={s.key}>
                            <DropdownMenu.Trigger asChild>
                                <button className="inline-flex items-center gap-1 rounded px-2 py-1.5 hover:bg-mwv-muted">
                                    {s.label}
                                    <ChevronDown className="size-3" />
                                </button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content sideOffset={6} className="rounded-md border bg-white p-1 shadow-card">
                                <DropdownMenu.Item asChild>
                                    <Link href={s.paths[0]} className="block rounded px-2 py-1.5 hover:bg-gray-50">My {s.label}</Link>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item asChild>
                                    <Link href={s.paths[1]} className="block rounded px-2 py-1.5 hover:bg-gray-50">Browse {s.label}</Link>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item asChild>
                                    <Link href={s.paths[2]} className="block rounded px-2 py-1.5 hover:bg-gray-50">Create {s.label.slice(0, -1)}</Link>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    ))}
                </nav>
                <div className="flex-1" />
                <div className="hidden md:flex items-center gap-2">
                    <div className="max-w-md w-64">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-2 top-2.5 size-4 text-gray-500" />
                            <input type="search" placeholder="Search…" className="w-full rounded-lg border border-mwv-border bg-mwv-muted pl-8 pr-3 py-2 text-sm outline-none shadow-sm focus:ring-2 focus:ring-mwv-ring" />
                        </div>
                    </div>
                    <button aria-label="Notifications" className="rounded-full p-2 hover:bg-mwv-muted"><Bell className="size-5" /></button>
                    <ThemeToggle />
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <button className="rounded p-2 hover:bg-mwv-muted" aria-label="Quick create"><Plus className="size-5" /></button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content sideOffset={6} className="rounded-md border bg-white p-1 shadow-card">
                            {sections.map((s) => (
                                <DropdownMenu.Item key={s.key} asChild>
                                    <Link href={s.paths[2]} className="block rounded px-2 py-1.5 hover:bg-gray-50">Create {s.label.slice(0, -1)}</Link>
                                </DropdownMenu.Item>
                            ))}
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </div>
            </div>
            {mobileOpen && (
                <div className="md:hidden border-t bg-white">
                    <div className="container mx-auto px-4 py-2 space-y-2">
                        {sections.map((s) => (
                            <details key={s.key}>
                                <summary className="cursor-pointer list-none rounded px-2 py-2 hover:bg-gray-50">{s.label}</summary>
                                <div className="pl-3 pb-2">
                                    <Link href={s.paths[0]} className="block rounded px-2 py-1.5 text-sm hover:bg-gray-50">My {s.label}</Link>
                                    <Link href={s.paths[1]} className="block rounded px-2 py-1.5 text-sm hover:bg-gray-50">Browse {s.label}</Link>
                                    <Link href={s.paths[2]} className="block rounded px-2 py-1.5 text-sm hover:bg-gray-50">Create {s.label.slice(0, -1)}</Link>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}


