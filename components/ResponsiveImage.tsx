import Image, { ImageProps } from 'next/image';
import React from 'react';

export function ResponsiveImage({ mobileSrc, desktopSrc, alt, ...props }: { mobileSrc: string; desktopSrc: string; alt: string } & Omit<ImageProps, 'src' | 'alt'>) {
  const enhance = (src: string, transform = 'f_auto,q_auto') => src.includes('res.cloudinary.com') ? src.replace('/upload/', `/upload/${transform}/`) : src;
  const m = enhance(mobileSrc, 'f_auto,q_auto,w_768');
  const d = enhance(desktopSrc, 'f_auto,q_auto,w_1280');
  return (
    <picture>
      <source media="(max-width: 768px)" srcSet={m} />
      <source media="(min-width: 769px)" srcSet={d} />
      <Image src={d} alt={alt} loading="lazy" quality={80} fill {...props} />
    </picture>
  );
}
