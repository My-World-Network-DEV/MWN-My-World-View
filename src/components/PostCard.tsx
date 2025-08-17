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
    <article className="card card-hover p-4">
      <header className="mb-2 flex items-start gap-4">
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
        <button className="rounded p-2 text-gray-500 hover:bg-gray-50">⋯</button>
      </header>

      <footer className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <button
          className="flex items-center gap-1 rounded px-2 py-2 hover:bg-mwv-muted transition-all duration-150"
          title="Draft a motion from this post"
        >
          <span aria-hidden>🚀</span>
          Promote
        </button>
        <button className="rounded px-2 py-2 hover:bg-mwv-muted transition-all duration-150">Comment</button>
        <button className="rounded px-2 py-2 hover:bg-mwv-muted transition-all duration-150">Share</button>
        <button
          className={`rounded px-2 py-2 hover:bg-mwv-muted transition-all duration-150 ${saved ? 'text-mwv-primary' : ''}`}
          onClick={() => setSaved((s) => !s)}
        >
          {saved ? 'Saved' : 'Save'}
        </button>
        {typeof post.evidenceCount === 'number' && (
          <span className="ml-auto pill" aria-label={`${post.evidenceCount} pieces of evidence`}>
            Evidence · {post.evidenceCount}
          </span>
        )}
      </footer>
    </article>
  );
}
