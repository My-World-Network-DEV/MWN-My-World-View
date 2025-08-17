import React from 'react';
import AppMenuBar from '@/components/AppMenuBar';
import Card from '@/components/Card';
import EvidenceCard from '@/components/EvidenceCard';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppMenuBar />
      <main className="container mx-auto px-4 py-6 space-y-4">
        <Card>
          <div className="text-sm text-gray-500">@ava · 12m</div>
          <h1 className="mt-1 text-lg font-medium">Full post title here</h1>
          <p className="mt-2 text-gray-800">Full post content with paragraphs, links, and citations.</p>
        </Card>
        <Card>
          <div className="text-sm font-medium">Evidence</div>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <EvidenceCard title="OECD report on automation" domain="oecd.org" date="2023-10-01" credibility="High" href="#" />
            <EvidenceCard title="Labor trends dataset" domain="data.gov" date="2024-02-12" credibility="Medium" href="#" />
          </div>
        </Card>
        <Card>
          <div className="text-sm font-medium">Comments</div>
          <div className="mt-2 text-sm text-gray-700">Comments thread goes here…</div>
        </Card>
      </main>
    </div>
  );
}
