import React from 'react';

type EvidenceCardProps = { source: string; excerpt: string };

export default function EvidenceCard({ source, excerpt }: EvidenceCardProps) {
  return (
    <div className="border p-4 rounded">
      <div className="text-sm font-medium">{source}</div>
      <p className="text-xs text-gray-600">{excerpt}</p>
    </div>
  );
}
