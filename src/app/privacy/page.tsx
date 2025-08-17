import React from 'react';
import AppMenuBar from '@/components/AppMenuBar';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppMenuBar />
      <main className="container mx-auto px-4 py-6 space-y-4">
        <h1 className="text-2xl font-semibold">Privacy Policy</h1>
        <section>
          <h2 className="text-lg font-medium">Data we collect</h2>
          <p className="text-gray-700">We collect account details, content you post, and usage analytics to improve MWV. Evidence uploads may include metadata.</p>
        </section>
        <section>
          <h2 className="text-lg font-medium">How we use data</h2>
          <p className="text-gray-700">To provide features like debates, notifications, recommendations, and to keep the platform safe.</p>
        </section>
        <section>
          <h2 className="text-lg font-medium">Your rights</h2>
          <p className="text-gray-700">You can request data export or deletion and manage visibility via settings, including dark/high-contrast themes and privacy options.</p>
        </section>
      </main>
    </div>
  );
}
