'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import StanceBar from './StanceBar';

type Counts5 = { 1: number; 2: number; 3: number; 4: number; 5: number };

export default function MotionCensusRealtime({ motionId, initialCounts }: { motionId: string; initialCounts: Counts5 }) {
    const [counts, setCounts] = useState<Counts5>(initialCounts);

    const total = useMemo(() => Object.values(counts).reduce((a, b) => a + b, 0), [counts]);

    useEffect(() => {
        // If supabase is misconfigured, supabase client may throw; guard channel setup
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return;
        const channel = supabase
            .channel(`stance_events_motion_${motionId}`)
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'stance_events', filter: `motion_id=eq.${motionId}` },
                (payload) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const s = Number((payload.new as any).stance) as 1 | 2 | 3 | 4 | 5;
                    if (s >= 1 && s <= 5) {
                        setCounts((prev) => ({ ...prev, [s]: (prev[s] || 0) + 1 } as Counts5));
                    }
                }
            )
            .subscribe();

        return () => {
            try {
                supabase.removeChannel(channel);
            } catch { }
        };
    }, [motionId]);

    return <StanceBar census5={{ counts, total }} />;
}


