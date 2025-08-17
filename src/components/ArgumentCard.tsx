import React from 'react';

type ArgumentCardProps = {
  text: string;
  evidenceCount?: number;
};

export default function ArgumentCard({ text, evidenceCount }: ArgumentCardProps) {
  return (
    <article className="card card-hover p-4 text-sm">
      <p>{text}</p>
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
