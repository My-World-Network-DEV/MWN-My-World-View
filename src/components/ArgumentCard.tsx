import React from 'react';

type ArgumentCardProps = { text: string };

export default function ArgumentCard({ text }: ArgumentCardProps) {
  return <div className="border p-4 rounded text-sm">{text}</div>;
}
