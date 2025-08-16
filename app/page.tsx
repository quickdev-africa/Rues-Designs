
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
  {/* SEO: Product Categories - tabletop, linen, draping, candle holders, pedestals, tables, dining chairs, bar stools, cocktail tables, shelves, bars, accent chairs, sofas, banquet sofas, coffee tables, side tables, backdrops, props */}
  <RentTheLookSection />
  {/* SEO: Rent the Look - event inspiration, design sets, curated looks, modern lounge, elegant dining, outdoor chic, event styling */}
  <FeaturedPackagesSection />
  {/* SEO: Featured Packages - curated event packages, party themes, wedding packages, festival furniture, lounge sets, outdoor events */}
      <HighlightsSection />
      {/* SEO: Highlights - bestsellers, trending rentals, popular event products, unique decor, premium furniture */}
      <NewsTrendsSection />
      {/* SEO: News & Trends - new arrivals, event trends, party ideas, rental news, event planning tips */}
      <HowItWorksSection />
      {/* SEO: How It Works - easy party rental, online booking, delivery, setup, event support, stress-free events */}
      <ContactSection />
      {/* SEO: Contact - event consultation, custom quote, party rental support, event design help */}
    </>
  );
}
