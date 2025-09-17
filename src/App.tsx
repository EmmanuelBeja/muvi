import React from 'react';

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-50 min-h-screen text-primary">{children}</div>
  );
}
