import React from 'react';

export function Button({ variant = 'primary', children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'outline' | 'ghost' }) {
  const base = 'px-6 py-2 rounded font-semibold transition-colors duration-200';
  const variants: Record<string, string> = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-primary hover:bg-secondary/80',
    accent: 'bg-[#D4AF36] text-white hover:bg-[#C19A2B]', // gold accent
    success: 'bg-success text-white hover:bg-success/90',
    warning: 'bg-warning text-white hover:bg-warning/90',
    error: 'bg-error text-white hover:bg-error/90',
    outline: 'border border-[#D4AF36] text-[#D4AF36] bg-white hover:bg-[#D4AF36]/10',
    ghost: 'bg-transparent text-[#D4AF36] hover:bg-[#D4AF36]/10',
  };
  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}
