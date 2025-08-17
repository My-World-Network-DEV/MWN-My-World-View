import './globals.css';
import React, { Suspense } from 'react';
import { VercelToolbar } from '@vercel/toolbar/next';
import { ToastProvider } from '@/components/ToastManager';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <ToastProvider>
          <div id="main-content">{children}</div>
        </ToastProvider>
        {/* Vercel Toolbar - shown in production by default; wrap in Suspense */}
        <Suspense>
          <VercelToolbar />
        </Suspense>
      </body>
    </html>
  );
}
