import React from 'react';

/**
 * App component
 * Wraps children with base layout styling for the application.
 * @param children - React children nodes to render inside the app layout.
 */
export default function App({ children }: { children: React.ReactNode }) {
  // Render children inside a styled div
  return <div className="min-h-screen text-primary">{children}</div>;
}
