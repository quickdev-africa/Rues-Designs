import { Metadata } from 'next';

interface SeoHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function generateMetadata({ title, description, image, url }: SeoHeadProps): Metadata {
  return {
    title: title ? `${title} | Rues Design & Rental` : 'Rues Design & Rental',
    description: description,
    viewport: 'width=device-width, initial-scale=1',
    openGraph: {
      title: title || 'Rues Design & Rental',
      description: description,
      images: image ? [{ url: image }] : undefined,
      url: url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'Rues Design & Rental',
      description: description,
      images: image ? [image] : undefined,
    },
    icons: {
      icon: '/favicon.ico',
    },
  };
}

// For backward compatibility
export default function SeoHead({ title, description, image, url }: SeoHeadProps) {
  // This is a no-op component now, as metadata is handled via the metadata API
  return null;
}
