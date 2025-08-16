import React from 'react';

export function Badge({ children, color = 'primary' }: { children: React.ReactNode; color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' }) {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-primary',
    accent: 'bg-accent text-primary',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    error: 'bg-error text-white',
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colorMap[color]}`}>{children}</span>
  );
}
