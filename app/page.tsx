
import { Metadata } from 'next';
import HeroSection from '../components/layout/HeroSection';
import FeaturedPackagesSection from '../components/sections/FeaturedPackagesSection';
import ProductCategoriesSection from '../components/sections/ProductCategoriesSection';
import RentTheLookSection from '../components/sections/RentTheLookSection';
import HighlightsSection from '../components/sections/HighlightsSection';
import NewsTrendsSection from '../components/sections/NewsTrendsSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import ContactSection from '../components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Party Rentals, Event Furniture & Decor | Rues Design & Rental',
  description: 'Discover premium party rentals, event furniture, and decor for weddings, corporate events, and celebrations. Modern, sustainable, and stylish event solutions in your city.',
  openGraph: {
    images: ['/images/stock/party-hero.jpg'],
    url: 'https://ruesdesign.com/',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* SEO: Hero - Party rentals, event design, wedding rentals, modern event furniture, decor, celebration, luxury, sustainable, delivery, setup */}
      <ProductCategoriesSection />
      <RentTheLookSection />
      <FeaturedPackagesSection />
      <HighlightsSection />
      <NewsTrendsSection />
      <HowItWorksSection />
      <ContactSection />
    </>
  );
}
