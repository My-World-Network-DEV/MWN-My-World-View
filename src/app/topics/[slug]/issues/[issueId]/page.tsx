import React from 'react';
import AppMenuBar from '@/components/AppMenuBar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Card from '@/components/Card';

export default async function Page({ params }: { params: Promise<{ slug: string; issueId: string }> }) {
  const { slug, issueId } = await params;
  return (
    <div className="min-h-screen bg-gray-50">
      <AppMenuBar />
      <main className="container mx-auto px-4 py-6 space-y-4">
        <Breadcrumbs items={[{ href: '/topics', label: 'Topics' }, { href: `/topics/${slug}`, label: slug }, { label: `Issue ${issueId}` }]} />
        <Card>
          <h1 className="text-lg font-medium">Issue title for {issueId}</h1>
          <p className="mt-1 text-sm text-gray-700">Issue summary and definitions go here.</p>
        </Card>
        <Card>
          <div className="text-sm font-medium">Related motions</div>
          <ul className="mt-2 space-y-2 text-sm">
            <li>Motion A</li>
            <li>Motion B</li>
          </ul>
        </Card>
      </main>
    </div>
  );
}
