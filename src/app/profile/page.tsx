"use client";
import { useEffect, useState } from 'react';
import AppMenuBar from '@/components/AppMenuBar';

export default function Page() {
    const [displayName, setDisplayName] = useState('');
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        // no-op demo; would load from users table when RLS/auth fully configured
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto px-4 py-6 space-y-4">
                <div className="rounded border bg-white p-4">
                    <h1 className="text-lg font-medium">Profile</h1>
                    <div className="mt-3">
                        <label className="text-sm font-medium">Display name</label>
                        <input className="mt-1 w-full rounded border px-3 py-2" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                    </div>
                    <button
                        className="mt-3 rounded bg-emerald-600 px-3 py-2 text-sm text-white"
                        onClick={async () => {
                            try {
                                // Placeholder: would update users table via RPC/server action
                                setStatus('Saved (demo).');
                            } catch {
                                setStatus('Error saving');
                            }
                        }}
                    >
                        Save
                    </button>
                    {status ? <div className="mt-2 text-xs text-gray-600">{status}</div> : null}
                </div>
            </main>
        </div>
    );
}


