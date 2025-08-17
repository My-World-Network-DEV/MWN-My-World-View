"use client";

import Image from 'next/image';
import CardExpandable from './CardExpandable';
import StanceBar from './StanceBar';
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
  const [promoteOpen, setPromoteOpen] = useState(false);
  const [title, setTitle] = useState(post.text);
  const [issue, setIssue] = useState('');
  const { add } = useToast();

  return (
    <>
      <CardExpandable
        header={
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
              <p className="mt-1 line-clamp-2 text-[15px] text-gray-800">{post.text}</p>
            </div>
            <button className="rounded p-2 text-gray-500 hover:bg-gray-50">⋯</button>
          </header>
        }
        collapsed={
          <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
            <div className="inline-flex items-center gap-2">
              <div className="hidden sm:block">
                <StanceBar census5={{ counts: { 1: 10, 2: 10, 3: 20, 4: 30, 5: 30 }, total: 100 }} variant="dense" />
              </div>
              {typeof post.evidenceCount === 'number' && (
                <span className="pill" aria-label={`${post.evidenceCount} pieces of evidence`}>
                  Evidence · {post.evidenceCount}
                </span>
              )}
            </div>
          </div>
        }
        expanded={
          <div className="space-y-3">
            <StanceBar census5={{ counts: { 1: 10, 2: 10, 3: 20, 4: 30, 5: 30 }, total: 100 }} />
            <div className="flex gap-2">
              <button className="rounded bg-mwv-accent px-3 py-2 text-sm text-white">Join stance</button>
              <button className="rounded border px-3 py-2 text-sm hover:bg-gray-50">Add argument</button>
            </div>
            <div className="text-xs text-gray-600">Sources: oecd.org (2023-10-01), data.gov (2024-02-12)</div>
          </div>
        }
      />
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
