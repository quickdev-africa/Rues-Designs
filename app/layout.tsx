
import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rues Design & Rental',
  description: 'Party rental and event design made easy. Discover, book, and celebrate with Rues.',
  viewport: 'width=device-width, initial-scale=1',
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
