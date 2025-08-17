import React from 'react';
import AppMenuBar from '@/components/AppMenuBar';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppMenuBar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Settings — Placeholder</h1>
        <p className="mt-2 text-sm text-gray-600">This is a placeholder page for the route. Replace with real UI and data fetching.</p>
      </main>
    </div>
  );
}
