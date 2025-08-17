import React from 'react';
import AppMenuBar from '@/components/AppMenuBar';
import Card from '@/components/Card';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page(props: any) {
  const params = (props as any).params || {};
  return (
    <div className="min-h-screen bg-gray-50">
      <AppMenuBar />
      <main className="container mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">@{params.username}</h1>
            <div className="text-sm text-gray-600">Policy analyst · Joined 2024</div>
          </div>
          <button className="rounded border px-3 py-2 text-sm hover:bg-gray-50">Edit profile</button>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          <Card>
            <div className="text-sm font-medium">Stats</div>
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              <li>Motions: 8</li>
              <li>Positions: 21</li>
              <li>Followers: 134</li>
            </ul>
          </Card>
          <Card className="lg:col-span-2">
            <div className="text-sm font-medium">Recent activity</div>
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              <li>Promoted a post to a motion</li>
              <li>Joined stance on Motion #123</li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
}
