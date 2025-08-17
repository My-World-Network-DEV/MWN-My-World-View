import React from 'react';

type PositionCardProps = {
  title: string;
  stance?: string;
  evidenceCount?: number;
};

export default function PositionCard({ title, stance, evidenceCount }: PositionCardProps) {
  return (
    <article className="card card-hover p-4">
      <h3 className="mb-2 text-sm font-medium">{title}</h3>
      {stance && <p className="text-sm text-gray-600">{stance}</p>}
      {typeof evidenceCount === 'number' && (
        <div className="mt-4">
          <span className="pill" aria-label={`${evidenceCount} pieces of evidence`}>
            Evidence · {evidenceCount}
          </span>
        </div>
      )}
    </article>
  );
}
