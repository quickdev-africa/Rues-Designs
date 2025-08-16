import React from 'react';

export function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block mb-4">
      <span className="block mb-1 font-heading text-primary">{label}</span>
      <input
        className="w-full px-4 py-2 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-accent disabled:bg-secondary/30"
        {...props}
      />
    </label>
  );
}
