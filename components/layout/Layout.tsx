"use client";
import AccessibleSkipNav from './AccessibleSkipNav';
import React from 'react';
import CartDrawer from '../ui/CartDrawer';
import Header from './Header';
import Footer from './Footer';
import { ErrorBoundary } from '../ui/ErrorBoundary';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = React.useState(false);

  React.useEffect(() => {
    function handleOpenCartDrawer() {
      setCartOpen(true);
    }
    window.addEventListener('openCartDrawer', handleOpenCartDrawer);
    return () => window.removeEventListener('openCartDrawer', handleOpenCartDrawer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <AccessibleSkipNav />
      <Header />
      <main id="main-content" className="flex-1 focus:outline-none">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      <Footer />
      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
