"use client";

import Image from 'next/image';
import { useState } from 'react';

type Post = {
  id: string;
  author: { name: string; handle: string; avatarUrl?: string };
  minutesAgo: number;
  text: string;
  evidenceCount?: number;
};

export default function PostCard({ post }: { post: Post }) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="rounded-lg border bg-white p-4">
      <header className="mb-2 flex items-start gap-3">
        <Image
          src={post.author.avatarUrl || "/avatar-placeholder.svg"}
          alt={post.author.name}
          width={36}
          height={36}
          className="rounded-full ring-1 ring-gray-200"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">{post.author.name}</span>
            <span className="text-gray-500">@{post.author.handle}</span>
            <span className="text-gray-400">· {post.minutesAgo}m</span>
          </div>
          <p className="mt-1 text-[15px] text-gray-800">{post.text}</p>
        </div>
        <button className="rounded p-1 text-gray-500 hover:bg-gray-50">⋯</button>
      </header>

      <footer className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
        <button className="rounded px-2 py-1 hover:bg-gray-50">Promote to Motion</button>
        <button className="rounded px-2 py-1 hover:bg-gray-50">Comment</button>
        <button className="rounded px-2 py-1 hover:bg-gray-50">Share</button>
        <button
          className={`rounded px-2 py-1 hover:bg-gray-50 ${saved ? 'text-blue-600' : ''}`}
          onClick={() => setSaved((s) => !s)}
        >
          {saved ? 'Saved' : 'Save'}
        </button>
        {typeof post.evidenceCount === 'number' && (
          <span className="ml-auto text-xs text-gray-500">{post.evidenceCount} evidence links</span>
        )}
      </footer>
    </article>
  );
}
