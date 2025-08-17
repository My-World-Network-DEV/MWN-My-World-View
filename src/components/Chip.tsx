import React from 'react';

type ChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    selected?: boolean;
    as?: 'button' | 'span';
};

export default function Chip({ children, selected, as = 'button', className = '', ...rest }: ChipProps) {
    const base = `inline-flex items-center rounded-full border px-2.5 py-1 text-xs transition ${selected
            ? 'border-mwv-border bg-mwv-muted ring-1 ring-mwv-ring'
            : 'border-mwv-border bg-mwv-card hover:bg-mwv-muted'
        }`;

    if (as === 'span') {
        return <span className={`${base} ${className}`}>{children}</span>;
    }
    return (
        <button type="button" className={`${base} ${className}`} {...rest}>
            {children}
        </button>
    );
}


