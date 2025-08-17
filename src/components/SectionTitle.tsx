import React, { ReactNode } from 'react';

export default function SectionTitle({ children, action }: { children: ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm font-medium text-gray-800">{children}</div>
      {action}
    </div>
  );
}
