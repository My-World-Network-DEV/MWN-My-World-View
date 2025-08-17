import React from 'react';
import AppMenuBar from '@/components/AppMenuBar';
import Card from '@/components/Card';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppMenuBar />
      <main className="container mx-auto px-4 py-6 space-y-4">
        <h1 className="text-2xl font-semibold">Search</h1>
        <div className="grid gap-3 lg:grid-cols-3">
          <Card>
            <div className="text-sm font-medium">Topics</div>
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              <li>Artificial intelligence</li>
              <li>Urban planning</li>
            </ul>
          </Card>
          <Card>
            <div className="text-sm font-medium">Issues</div>
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              <li>Regulate AI alignment</li>
              <li>Plastic exports</li>
            </ul>
          </Card>
          <Card>
            <div className="text-sm font-medium">Motions</div>
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              <li>UBI improves societal resilience</li>
              <li>Phase out coal by 2030</li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
}
