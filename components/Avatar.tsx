import React from 'react';

export function Avatar({ src, alt, size = 40 }: { src: string; alt: string; size?: number }) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="rounded-full object-cover border-2 border-accent"
      style={{ width: size, height: size }}
    />
  );
}
