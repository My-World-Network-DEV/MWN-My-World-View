"use client";
import AppMenuBar from '@/components/AppMenuBar';
import Card from '@/components/Card';
import { useEffect, useRef, useState } from 'react';

type Msg = { id: string; from: string; text: string; at: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page({ params }: any) {
    const [msgs, setMsgs] = useState<Msg[]>([
        { id: 'm1', from: 'ava', text: 'Hey! Reviewing the motion now.', at: '10:02' },
        { id: 'm2', from: 'me', text: 'Thanks! Added a new evidence link.', at: '10:05' },
    ]);
    const [value, setValue] = useState('');
    const endRef = useRef<HTMLDivElement>(null);
    useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs.length]);
    return (
        <div className="min-h-screen bg-gray-50">
            <AppMenuBar />
            <main className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12">
                <section className="lg:col-span-8 lg:col-start-3 space-y-3">
                    <Card>
                        <div className="text-sm font-medium">Conversation · {params.conversationId}</div>
                    </Card>
                    <Card className="space-y-3">
                        {msgs.map((m) => (
                            <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] rounded-md px-3 py-2 text-sm ${m.from === 'me' ? 'bg-mwv-accent text-white' : 'bg-mwv-muted'}`}>
                                    <div>{m.text}</div>
                                    <div className="mt-1 text-[10px] opacity-70">{m.at}</div>
                                </div>
                            </div>
                        ))}
                        <div ref={endRef} />
                    </Card>
                    <Card>
                        <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (!value.trim()) return; setMsgs((arr) => [...arr, { id: Math.random().toString(36).slice(2), from: 'me', text: value, at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]); setValue(''); }}>
                            <input className="flex-1 rounded border px-3 py-2 text-sm" placeholder="Message…" value={value} onChange={(e) => setValue(e.target.value)} />
                            <button className="rounded bg-mwv-accent px-3 py-2 text-sm text-white">Send</button>
                        </form>
                    </Card>
                </section>
            </main>
        </div>
    );
}


