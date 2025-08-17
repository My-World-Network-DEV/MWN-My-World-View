import React from 'react';

type IssueCardProps = {
  title: string;
  description?: string;
  evidenceCount?: number;
};

export default function IssueCard({ title, description, evidenceCount }: IssueCardProps) {
  return (
    <article className="card card-hover p-4">
      <h3 className="mb-2 text-sm font-medium">{title}</h3>
      {description && <p className="text-sm text-gray-600">{description}</p>}
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
