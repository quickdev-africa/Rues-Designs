import Image, { ImageProps } from 'next/image';
import React from 'react';

export function ResponsiveImage({ mobileSrc, desktopSrc, alt, ...props }: { mobileSrc: string; desktopSrc: string; alt: string } & Omit<ImageProps, 'src' | 'alt'>) {
  return (
    <picture>
      <source media="(max-width: 768px)" srcSet={mobileSrc} />
      <source media="(min-width: 769px)" srcSet={desktopSrc} />
      <Image src={desktopSrc} alt={alt} loading="lazy" quality={80} fill {...props} />
    </picture>
  );
}
