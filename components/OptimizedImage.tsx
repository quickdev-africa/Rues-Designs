import Image, { ImageProps } from 'next/image';
import React from 'react';

function cld(src: string, transform = 'f_auto,q_auto') {
  if (!src?.includes('res.cloudinary.com')) return src;
  return src.replace('/upload/', `/upload/${transform}/`);
}

export function OptimizedImage(props: ImageProps) {
  const src = typeof props.src === 'string' ? cld(props.src as string) : props.src;
  return <Image loading="lazy" quality={80} sizes="(max-width: 768px) 100vw, 50vw" {...props} src={src} />;
}
