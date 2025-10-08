
import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import { CartProvider } from '../components/ui/CartContext';
import { WishlistProvider } from '../components/ui/WishlistContext';
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
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            <Layout>{children}</Layout>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
