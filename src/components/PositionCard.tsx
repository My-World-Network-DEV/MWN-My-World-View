import React from 'react';

type PositionCardProps = { title: string; stance?: string };

export default function PositionCard({ title, stance }: PositionCardProps) {
  return (
    <div className="border p-4 rounded">
      <div className="font-medium">{title}</div>
      {stance && <p className="text-sm text-gray-600">{stance}</p>}
    </div>
  );
}
