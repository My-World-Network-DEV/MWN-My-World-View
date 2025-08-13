import React from 'react';

type TopicCardProps = { title: string; description?: string };

export default function TopicCard({ title, description }: TopicCardProps) {
  return (
    <div className="border p-4 rounded">
      <div className="font-medium">{title}</div>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
  );
}
