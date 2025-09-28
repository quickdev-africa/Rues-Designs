'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

const collections = [
  {
    id: 'bohemian',
    title: 'Bohemian Romance',
    description: 'A free-spirited collection featuring warm earth tones, eclectic textiles, and natural materials. Perfect for creating a relaxed yet sophisticated atmosphere.',
    image: '/images/stock/collection-bohemian.jpg',
    items: 24
  },
  {
    id: 'modern-minimal',
    title: 'Modern Minimal',
    description: 'Clean lines, monochromatic palettes, and architectural forms define this contemporary collection. Ideal for sleek, sophisticated events.',
    image: '/images/stock/collection-modern.jpg',
    items: 18
  },
  {
    id: 'vintage-luxe',
    title: 'Vintage Luxe',
    description: 'Timeless elegance with rich textures, ornate details, and classic silhouettes. This collection brings old-world charm to any celebration.',
    image: '/images/stock/collection-vintage.jpg',
    items: 32
  },
  {
    id: 'garden-romance',
    title: 'Garden Romance',
    description: 'Bring the outdoors in with this lush, botanical-inspired collection featuring floral elements, natural textures, and soft pastels.',
    image: '/images/stock/collection-garden.jpg',
    items: 22
  },
  {
    id: 'glam-gold',
    title: 'Glam & Gold',
    description: 'Make a statement with this luxurious collection showcasing metallic finishes, plush textures, and dramatic silhouettes.',
    image: '/images/stock/category-candle.png',
    items: 20
  },
  {
    id: 'rustic-charm',
    title: 'Rustic Charm',
    description: 'Warm and inviting, this collection blends natural woods, weathered finishes, and homespun textures for a cozy, down-to-earth feel.',
    image: '/images/stock/category-props.png',
    items: 28
  },
];

export default function CollectionsPage() {
  return (
    <main>
      <PageHeader
        title="Our Curated Collections"
        subtitle="Expertly designed rental groupings to create cohesive event aesthetics"
        bgImage="/images/stock/category-tabletop.png"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link 
              href={`/collections/${collection.id}`} 
              key={collection.id}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative h-64">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6">
                      <h2 className="text-white text-2xl font-bold mb-2">
                        {collection.title}
                      </h2>
                      <div className="text-white/80 text-sm">
                        {collection.items} items
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">
                    {collection.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="inline-flex items-center text-[#D4AF37] font-medium group-hover:text-[#C09F27]">
                      View Collection
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Something Custom?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            We can create bespoke rental collections tailored to your specific event vision. 
            Our design team will work with you to curate the perfect selection of pieces.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-[#D4AF37] text-white px-6 py-3 rounded-md font-medium hover:bg-[#C09F27] transition-colors"
          >
            Request Custom Collection
          </Link>
        </div>
      </div>
    </main>
  );
}
