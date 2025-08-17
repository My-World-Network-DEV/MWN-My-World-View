import React from 'react';
import AppMenuBar from '@/components/AppMenuBar';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppMenuBar />
      <main className="container mx-auto px-4 py-6 space-y-4">
        <h1 className="text-2xl font-semibold">About My World View</h1>
        <p className="text-gray-700">MWV is an evidence-first debate platform. We help communities surface the best arguments, attach credible sources, and converge on solutions.</p>
        <section>
          <h2 className="text-lg font-medium">Mission</h2>
          <p className="text-gray-700">Our mission is to elevate civic discourse with structured debates, transparent sourcing, and participatory decision-making.</p>
        </section>
        <section>
          <h2 className="text-lg font-medium">Team</h2>
          <p className="text-gray-700">MWV is built by a small, distributed team of engineers and researchers. Contact us for collaboration.</p>
        </section>
        <section>
          <h2 className="text-lg font-medium">Community guidelines</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Be civil and assume good faith</li>
            <li>Substantiate claims with sources</li>
            <li>Respect privacy and consent</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
