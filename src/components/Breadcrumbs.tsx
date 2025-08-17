import Link from 'next/link';

type Crumb = { href?: string; label: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
    return (
        <nav aria-label="Breadcrumb" className="text-sm text-mwv-muted">
            <ol className="flex items-center gap-2">
                {items.map((c, i) => {
                    const isLast = i === items.length - 1;
                    return (
                        <li key={`${c.label}-${i}`} className="flex items-center gap-2">
                            {c.href && !isLast ? (
                                <Link href={c.href} className="hover:underline">
                                    {c.label}
                                </Link>
                            ) : (
                                <span aria-current="page" className="text-mwv-foreground">
                                    {c.label}
                                </span>
                            )}
                            {!isLast && <span className="text-mwv-muted">/</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}


