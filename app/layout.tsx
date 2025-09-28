
import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Rues Design & Rental',
  description: 'Party rental and event design made easy. Discover, book, and celebrate with Rues.',
  metadataBase: new URL('https://ruesdesign.com'),
  openGraph: {
    title: 'Rues Design & Rental',
    description: 'Party rental and event design made easy. Discover, book, and celebrate with Rues.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rues Design & Rental',
    description: 'Party rental and event design made easy. Discover, book, and celebrate with Rues.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
