import React from 'react';

type CardProps = React.HTMLAttributes<HTMLElement> & { as?: keyof JSX.IntrinsicElements };

export default function Card({ as = 'article', className, children, ...rest }: CardProps) {
    const Component = as as any;
    return (
        <Component className={`card card-hover p-4 ${className || ''}`} {...rest}>
            {children}
        </Component>
    );
}


