import AccessibleSkipNav from './AccessibleSkipNav';
import Header from './Header';
import Footer from './Footer';
import { ErrorBoundary } from '../ui/ErrorBoundary';

export default function Layout({ children }: { children: React.ReactNode }) {
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
    </div>
  );
}
