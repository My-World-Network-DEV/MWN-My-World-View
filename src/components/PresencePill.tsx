'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function PresencePill({ channelName }: { channelName: string }) {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const channel = supabase.channel(channelName, { config: { presence: { key: crypto.randomUUID() } } });
        channel.on('presence', { event: 'sync' }, () => {
            const state = channel.presenceState();
            setCount(Object.keys(state).length);
        });
        channel.subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
                await channel.track({ online_at: new Date().toISOString() });
            }
        });
        return () => {
            supabase.removeChannel(channel);
        };
    }, [channelName]);

    return (
        <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
            {count} online
        </span>
    );
}


