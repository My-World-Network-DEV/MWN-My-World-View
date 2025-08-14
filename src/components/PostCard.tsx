import React from 'react';
import Image from 'next/image';

export type PostCardProps = {
  id?: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt?: string;
};

export default function PostCard({ authorName, authorAvatar, content, createdAt }: PostCardProps) {
  return (
    <article className="rounded-lg border bg-white p-4 shadow-sm">
      <header className="flex items-center gap-3">
        <Image src={authorAvatar || '/avatar-placeholder.svg'} alt={authorName} width={40} height={40} className="rounded-full object-cover" />
        <div>
          <div className="text-sm font-medium">{authorName}</div>
          <div className="text-xs text-gray-500">{createdAt || 'just now'}</div>
        </div>
      </header>
      <section className="mt-3 text-sm text-gray-800">{content}</section>
      <footer className="mt-3 flex items-center gap-4 text-xs text-gray-500">
        <button className="hover:text-indigo-600">Promote to motion</button>
        <button className="hover:text-indigo-600">React</button>
        <button className="hover:text-indigo-600">Share</button>
      </footer>
    </article>
  );
}
