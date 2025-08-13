import React from 'react';
import TopNav from '@/components/TopNav';

export default function Page({ params }: { params?: { [key: string]: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Privacy — Placeholder</h1>
        <p className="mt-2 text-sm text-gray-600">This is a placeholder page for the route. Replace with real UI and data fetching.</p>
      </main>
    </div>
  );
}
