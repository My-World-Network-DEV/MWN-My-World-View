'use client';

type Node = { id: string; label: string; x: number; y: number };
type Edge = { from: string; to: string };

export default function DebateCanvas({ nodes = [], edges = [] }: { nodes?: Node[]; edges?: Edge[] }) {
    return (
        <div className="h-96 w-full rounded-lg border bg-white">
            {/* TODO: implement pan/zoom; placeholder nodes */}
            <div className="p-3 text-sm text-gray-600">Debate graph placeholder ({nodes.length} nodes, {edges.length} edges)</div>
        </div>
    );
}


