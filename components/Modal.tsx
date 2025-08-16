import React from 'react';

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-primary hover:text-error text-2xl">&times;</button>
        <h3 className="font-heading text-2xl mb-4 text-primary">{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  );
}
