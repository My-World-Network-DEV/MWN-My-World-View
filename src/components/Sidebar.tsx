"use client";
import Link from 'next/link';
import { Home, Compass, FolderTree, Bell, Bookmark, User, MessageSquare } from 'lucide-react';

const items = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/explore', label: 'Explore', Icon: Compass },
  { href: '/topics/demo-topic', label: 'Topics', Icon: FolderTree },
  { href: '/forums', label: 'Forums', Icon: MessageSquare },
  { href: '/saved', label: 'Saved', Icon: Bookmark },
  { href: '/notifications', label: 'Notifications', Icon: Bell },
];

const sections = [
  { title: 'Pinned topics', tags: ['Climate Change', 'Technology', 'Healthcare'] },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:block lg:col-span-2 xl:col-span-2">
      <div className="sticky top-[64px] space-y-6">
        <nav className="rounded-lg border bg-white p-2">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <i.Icon aria-hidden className="size-4" />
              <span>{i.label}</span>
            </Link>
          ))}
          <div className="mt-2 flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700">
            <User aria-hidden className="size-4" />
            <Link href="/settings" className="hover:underline">Settings</Link>
          </div>
        </nav>
        {sections.map((s) => (
          <div key={s.title} className="rounded-lg border bg-white p-3">
            <div className="mb-2 text-xs font-semibold uppercase text-gray-500">{s.title}</div>
            <ul className="space-y-1">
              {s.tags.map((t) => (
                <li key={t}>
                  <button className="w-full text-left rounded-md px-2 py-1 text-sm hover:bg-gray-50">{t}</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}

