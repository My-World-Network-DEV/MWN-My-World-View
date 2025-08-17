import React from 'react';
import AppMenuBar from '@/components/AppMenuBar';
import Card from '@/components/Card';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppMenuBar />
      <main className="container mx-auto px-4 py-6 space-y-4">
        <h1 className="text-2xl font-semibold">Admin dashboard</h1>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Card><div className="text-sm">Users</div><div className="mt-1 text-2xl font-semibold">1,240</div></Card>
          <Card><div className="text-sm">Active debates</div><div className="mt-1 text-2xl font-semibold">23</div></Card>
          <Card><div className="text-sm">Flagged items</div><div className="mt-1 text-2xl font-semibold">12</div></Card>
          <Card><div className="text-sm">New motions (7d)</div><div className="mt-1 text-2xl font-semibold">38</div></Card>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          <Card>
            <div className="text-sm font-medium">Moderation queue</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex justify-between"><span>Comment by @demo</span><button className="rounded bg-mwv-success px-2 py-1 text-white text-xs">Approve</button></li>
              <li className="flex justify-between"><span>Motion &quot;Ban plastic exports&quot;</span><button className="rounded bg-mwv-error px-2 py-1 text-white text-xs">Flag</button></li>
            </ul>
          </Card>
          <Card>
            <div className="text-sm font-medium">Audit log</div>
            <ul className="mt-2 space-y-1 text-xs text-gray-700">
              <li>10:20 — @admin flagged comment #493</li>
              <li>09:58 — @mod approved motion #221</li>
              <li>09:30 — New user signed up</li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
}
