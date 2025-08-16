import React from 'react';

export function Button({ variant = 'primary', children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'outline' | 'ghost' }) {
  const base = 'px-6 py-2 rounded font-semibold transition-colors duration-200';
  const variants: Record<string, string> = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-primary hover:bg-secondary/80',
    accent: 'bg-accent text-primary hover:bg-accent/80',
    success: 'bg-success text-white hover:bg-success/90',
    warning: 'bg-warning text-white hover:bg-warning/90',
    error: 'bg-error text-white hover:bg-error/90',
    outline: 'border border-primary text-primary bg-white hover:bg-primary/10',
    ghost: 'bg-transparent text-primary hover:bg-primary/10',
  };
  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}
