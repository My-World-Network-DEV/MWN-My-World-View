"use client";
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function TopNav() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-mwv-border bg-mwv-card/80 backdrop-blur">
      <div className="container mx-auto flex items-center gap-3 px-4 py-3">
        <Link href="/" className="font-bold text-lg tracking-tight">MWV</Link>
        <nav className="hidden md:flex items-center gap-5 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <Link href="/explore" className="hover:text-gray-900">Explore</Link>
          <Link href="/topics/demo-topic" className="hover:text-gray-900">Topics</Link>
        </nav>
        <div className="flex-1" />
        <div className="max-w-md flex-1 md:flex-none">
          <input
            type="search"
            placeholder="Search a thought..."
            className="w-full rounded-lg border border-mwv-border bg-mwv-muted px-3 py-2 text-sm outline-none shadow-sm focus:ring-2 focus:ring-mwv-ring"
          />
        </div>
        <button className="ml-3 rounded-md bg-mwv-primary px-3 py-2 text-mwv-primary-foreground text-sm hover:bg-blue-700 transition-all duration-150">
          Create
        </button>
        <button aria-label="Notifications" className="relative ml-2 rounded-full p-2 hover:bg-mwv-muted transition-all duration-150">
          <span className="text-xl">🔔</span>
          <span className="absolute -top-0.5 -right-0.5 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-medium text-white">1</span>
        </button>
        <ThemeToggle />
        <Image
          src="/avatar-placeholder.svg"
          alt="Profile"
          width={28}
          height={28}
          className="ml-2 rounded-full ring-1 ring-mwv-border"
          loading="lazy"
        />
      </div>
    </header>
  );
}
 
