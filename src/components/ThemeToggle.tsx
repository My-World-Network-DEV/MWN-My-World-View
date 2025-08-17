"use client";
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mode, setMode] = useState<'light' | 'dark' | 'high-contrast'>('light');

  useEffect(() => {
    const stored = (localStorage.getItem('theme') as 'light' | 'dark' | 'high-contrast' | null) || null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: 'light' | 'dark' | 'high-contrast' = stored || (prefersDark ? 'dark' : 'light');
    applyMode(initial);
    setMode(initial);
  }, []);

  const applyMode = (m: 'light' | 'dark' | 'high-contrast') => {
    const root = document.documentElement;
    root.classList.remove('dark', 'high-contrast');
    if (m === 'dark') root.classList.add('dark');
    if (m === 'high-contrast') root.classList.add('high-contrast');
    localStorage.setItem('theme', m);
  };

  const toggle = () => {
    const order: Array<'light' | 'dark' | 'high-contrast'> = ['light', 'dark', 'high-contrast'];
    const next = order[(order.indexOf(mode) + 1) % order.length];
    applyMode(next);
    setMode(next);
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className="rounded-md p-2 hover:bg-mwv-muted transition-all duration-150"
    >
      {mode === 'light' ? '☀️' : mode === 'dark' ? '🌙' : '⚡'}
    </button>
  );
}
