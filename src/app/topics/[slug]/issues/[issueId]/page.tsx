import React from 'react';
import AppMenuBar from '@/components/AppMenuBar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Card from '@/components/Card';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page(props: any) {
  const params = (props as any).params || { slug: '', issueId: '' };
  return (
    <div className="min-h-screen bg-gray-50">
      <AppMenuBar />
      <main className="container mx-auto px-4 py-6 space-y-4">
        <Breadcrumbs items={[{ href: '/topics', label: 'Topics' }, { href: `/topics/${params.slug}`, label: params.slug }, { label: `Issue ${params.issueId}` }]} />
        <Card>
          <h1 className="text-lg font-medium">Issue title for {params.issueId}</h1>
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
