'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

type Node = { id: string; label: string };
type Edge = { source: string; target: string };

const ForceGraph2D = dynamic(() => import('react-force-graph-2d').then((m) => m.default), { ssr: false });

export default function DebateCanvas({ nodes = [], edges = [] }: { nodes?: Node[]; edges?: Edge[] }) {
    const data = useMemo(() => ({ nodes: nodes.map((n) => ({ ...n })), links: edges.map((e) => ({ source: e.source, target: e.target })) }), [nodes, edges]);
    return (
        <div className="h-96 w-full rounded-lg border bg-white">
            <ForceGraph2D
                graphData={data}
                nodeLabel={(n) => (n as any).label}
                nodeAutoColorBy="id"
                enableNodeDrag
                cooldownTicks={50}
                linkDirectionalParticles={1}
                onNodeClick={(n) => {
                    const id = (n as any).id as string;
                    window.location.href = `/posts/${id}`;
                }}
            />
        </div>
    );
}


