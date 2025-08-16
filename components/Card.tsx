import React from 'react';

export function Card({ title, children, image }: { title: string; children: React.ReactNode; image?: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
      {image && <img src={image} alt={title} className="rounded-t-lg mb-4 w-full object-cover h-48" />}
      <h2 className="font-heading text-2xl mb-2 text-primary">{title}</h2>
      <div className="text-body text-primary/80">{children}</div>
    </div>
  );
}
