import { ReactNode } from 'react';

export default function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-semibold leading-snug">{children}</h2>;
}
