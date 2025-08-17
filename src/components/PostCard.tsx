"use client";

import Image from 'next/image';
import Card from './Card';
import ModalDialog from './ModalDialog';
import { useState } from 'react';
import { useToast } from './ToastManager';

type Post = {
  id: string;
  author: { name: string; handle: string; avatarUrl?: string };
  minutesAgo: number;
  text: string;
  evidenceCount?: number;
};

export default function PostCard({ post }: { post: Post }) {
  const [saved, setSaved] = useState(false);
  const [promoteOpen, setPromoteOpen] = useState(false);
  const [title, setTitle] = useState(post.text);
  const [issue, setIssue] = useState('');
  const { add } = useToast();

  return (
    <>
      <Card as="article">
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
            className="flex items-center gap-1 rounded px-2 py-2 hover:bg-mwv-muted transition-all duration-150 text-mwv-accent"
            title="Draft a motion from this post"
            onClick={() => setPromoteOpen(true)}
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
      </Card>
      <ModalDialog open={promoteOpen} onClose={() => setPromoteOpen(false)} title="Promote to Motion">
        <div className="space-y-3 text-sm">
          <label className="block">
            <span className="text-xs text-gray-600">Proposition</span>
            <textarea className="mt-1 w-full rounded border px-3 py-2" rows={3} value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-xs text-gray-600">Issue</span>
            <input className="mt-1 w-full rounded border px-3 py-2" value={issue} onChange={(e) => setIssue(e.target.value)} placeholder="Search or create issue" />
          </label>
          <div className="flex justify-end gap-2">
            <button className="rounded px-3 py-2 text-sm hover:bg-gray-50" onClick={() => setPromoteOpen(false)}>Cancel</button>
            <button
              className="rounded bg-mwv-accent px-3 py-2 text-sm text-white disabled:opacity-50"
              disabled={!title.trim()}
              onClick={() => {
                setPromoteOpen(false);
                const newId = Math.random().toString(36).slice(2, 8);
                add({ variant: 'success', title: 'Motion created', text: 'View your new motion', durationMs: 5000 });
                window.location.href = `/motions/${newId}`;
              }}
            >
              Create motion
            </button>
          </div>
        </div>
      </ModalDialog>
    </>
  );
}
