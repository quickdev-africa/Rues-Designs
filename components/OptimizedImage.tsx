import Image, { ImageProps } from 'next/image';
import React from 'react';

export function OptimizedImage(props: ImageProps) {
  return <Image loading="lazy" quality={80} sizes="(max-width: 768px) 100vw, 50vw" {...props} />;
}
