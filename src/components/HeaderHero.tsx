import React from 'react';

export default function HeaderHero() {
  return (
    <div className="relative overflow-hidden border-b bg-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.10),transparent_55%),radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.10),transparent_55%)]" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">My World View</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-600">
              A clean, evidence-first feed. Promote ideas into Issues and Motions; track stance trends.
            </p>
            <CensusTicker />
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50">New Topic</button>
            <button className="rounded-lg bg-gray-900 px-3 py-2 text-sm text-white hover:bg-black">Start Motion</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CensusTicker() {
  return (
    <div className="mt-3 text-xs text-gray-600">Motions 128 · Positions 5,341 · Today’s votes 1,204</div>
  );
}

