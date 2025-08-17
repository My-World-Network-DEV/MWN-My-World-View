import React from 'react';

type EvidenceCardProps = {
  title: string;
  domain: string;
  date?: string;
  credibility?: 'Low' | 'Medium' | 'High';
  href?: string;
};

export default function EvidenceCard({ title, domain, date, credibility = 'Medium', href = '#' }: EvidenceCardProps) {
  const credColor = credibility === 'High' ? 'bg-mwv-success' : credibility === 'Low' ? 'bg-mwv-error' : 'bg-gray-500';
  return (
    <a href={href} target="_blank" rel="noreferrer" className="block rounded-2xl border border-mwv-border bg-mwv-card p-4 shadow-card hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="text-sm font-medium line-clamp-2">{title}</div>
          <div className="mt-1 text-xs text-gray-600">{domain}{date ? ` · ${date}` : ''}</div>
        </div>
        <span className={`pill ${credColor} text-white border-transparent`}>{credibility}</span>
      </div>
    </a>
  );
}
