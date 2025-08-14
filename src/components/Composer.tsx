"use client";

import Image from 'next/image';
import { useState } from 'react';

export default function Composer() {
  const [value, setValue] = useState('');
  return (
    <div className="rounded-lg border bg-white p-3">
      <div className="flex gap-3">
        <Image src="/avatar-placeholder.svg" alt="You" width={32} height={32} className="rounded-full ring-1 ring-gray-200" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Share a thought..."
          className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white disabled:opacity-50"
          disabled={!value.trim()}
          onClick={() => setValue('')}
        >
          Post
        </button>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
        <button className="rounded px-2 py-1 hover:bg-gray-50">Attach</button>
        <button className="rounded px-2 py-1 hover:bg-gray-50">Cite</button>
        <button className="rounded px-2 py-1 hover:bg-gray-50">Poll</button>
      </div>
    </div>
  );
}

 
