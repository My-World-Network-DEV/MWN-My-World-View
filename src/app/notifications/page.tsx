import React from 'react';
import AppMenuBar from '@/components/AppMenuBar';
import Card from '@/components/Card';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppMenuBar />
      <main className="container mx-auto px-4 py-6 space-y-4">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <div className="grid gap-3 lg:grid-cols-2">
          <Card>
            <div className="text-sm font-medium">Recent</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li>@ben replied to your argument</li>
              <li>Your stance received 3 new votes</li>
              <li>New follower: @analyst_one</li>
            </ul>
          </Card>
          <Card>
            <div className="text-sm font-medium">Preferences</div>
            <form className="mt-2 space-y-2 text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Mentions</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Replies</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Email summaries</label>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
