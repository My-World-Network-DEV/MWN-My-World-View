import React, { ElementType, HTMLAttributes } from 'react';

type CardProps<T extends ElementType = 'article'> = HTMLAttributes<HTMLElement> & { as?: T };

export default function Card<T extends ElementType = 'article'>({ as, className, children, ...rest }: CardProps<T>) {
    const Component = (as || 'article') as ElementType;
    return (
        <Component className={`card card-hover p-4 ${className || ''}`} {...rest}>
            {children}
        </Component>
    );
}


