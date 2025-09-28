'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';

// Gallery filters categories
const filters = [
  { id: 'all', name: 'All' },
  { id: 'weddings', name: 'Weddings' },
  { id: 'corporate', name: 'Corporate Events' },
  { id: 'social', name: 'Social Gatherings' },
  { id: 'showcase', name: 'Product Showcase' },
];

// Gallery images
const galleryImages = [
  {
    id: 1,
    src: '/images/stock/category-tabletop.png',
    alt: 'Elegant wedding table setting with gold accents',
    categories: ['weddings'],
    title: 'Golden Elegance Wedding',
    location: 'Grand Ballroom, San Francisco'
  },
  {
    id: 2,
    src: '/images/stock/category-linen.png',
    alt: 'Corporate event with modern furniture setup',
    categories: ['corporate'],
    title: 'Tech Summit 2023',
    location: 'Innovation Center, Silicon Valley'
  },
  {
    id: 3,
    src: '/images/stock/category-props.png',
    alt: 'Birthday celebration with vibrant decor',
    categories: ['social'],
    title: '30th Birthday Celebration',
    location: 'Rooftop Garden, Downtown'
  },
  {
    id: 4,
    src: '/images/stock/category-candle.png',
    alt: 'Product launch with elegant display pedestals',
    categories: ['showcase', 'corporate'],
    title: 'Luxury Fragrance Launch',
    location: 'Metropolitan Gallery'
  },
  {
    id: 5,
    src: '/images/stock/category-accent-chairs.png',
    alt: 'Wedding lounge area with sophisticated seating',
    categories: ['weddings'],
    title: 'Modern Minimalist Wedding',
    location: 'Coastal Estate, Malibu'
  },
  {
    id: 6,
    src: '/images/stock/category-tables.png',
    alt: 'Gala dinner with round tables and centerpieces',
    categories: ['social', 'corporate'],
    title: 'Annual Charity Gala',
    location: 'Historic Opera House'
  },
  {
    id: 7,
    src: '/images/stock/category-sofas.png',
    alt: 'Cozy lounge setup for corporate retreat',
    categories: ['corporate'],
    title: 'Executive Leadership Retreat',
    location: 'Mountain Lodge Resort'
  },
  {
    id: 8,
    src: '/images/stock/category-backdrops.png',
    alt: 'Wedding ceremony backdrop with floral elements',
    categories: ['weddings'],
    title: 'Garden Romance Wedding',
    location: 'Botanical Gardens'
  },
  {
    id: 9,
    src: '/images/stock/category-dining-chairs.png',
    alt: 'Family reunion dinner setup',
    categories: ['social'],
    title: 'Family Reunion Dinner',
    location: 'Private Estate, Napa Valley'
  },
  {
    id: 10,
    src: '/images/stock/category-pedestals.png',
    alt: 'Product display for fashion show',
    categories: ['showcase'],
    title: 'Fall Fashion Showcase',
    location: 'Modern Art Museum'
  },
  {
    id: 11,
    src: '/images/stock/category-bar-cocktail.png',
    alt: 'Corporate mixer with bar setup',
    categories: ['corporate', 'social'],
    title: 'Industry Networking Event',
    location: 'Urban Loft Space'
  },
  {
    id: 12,
    src: '/images/stock/category-coffee-side.png',
    alt: 'Intimate wedding lounge area',
    categories: ['weddings'],
    title: 'Intimate Garden Wedding',
    location: 'Heritage Rose Garden'
  },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<null | number>(null);
  
  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.categories.includes(activeFilter));
    
  const handleImageClick = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };
  
  const handleCloseModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };
  
  const selectedImageData = selectedImage !== null 
    ? galleryImages.find(img => img.id === selectedImage) 
    : null;
  
  return (
    <main>
      <PageHeader
        title="Event Gallery"
        subtitle="Browse our portfolio of stunning event designs and installations"
        bgImage="/images/stock/category-backdrops.png"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Gallery filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter.id 
                ? 'bg-[#D4AF37] text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>
        
        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className="relative overflow-hidden rounded-lg shadow-md aspect-square cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => handleImageClick(image.id)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white">
                  <h3 className="text-lg font-semibold">{image.title}</h3>
                  <p className="text-sm text-white/80">{image.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* No results message */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">No gallery items match this filter</h3>
            <p className="text-gray-500 mt-2">Please try another category or view all items</p>
          </div>
        )}
        
        {/* Image modal */}
        {selectedImage !== null && selectedImageData && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={handleCloseModal}>
            <div 
              className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              <div className="relative h-[50vh] md:h-[60vh]">
                <Image
                  src={selectedImageData.src}
                  alt={selectedImageData.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-2xl font-bold">{selectedImageData.title}</h3>
                <p className="text-gray-600">{selectedImageData.location}</p>
                <div className="mt-2 flex gap-2">
                  {selectedImageData.categories.map((cat) => (
                    <span 
                      key={cat} 
                      className="inline-block px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                    >
                      {filters.find(f => f.id === cat)?.name}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Own Event?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Let us help you design a beautiful, memorable event with our premium rental collection.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/shop" 
              className="inline-block bg-[#D4AF37] text-white px-6 py-3 rounded-md font-medium hover:bg-[#C09F27] transition-colors"
            >
              Browse Rental Items
            </a>
            <a 
              href="/contact" 
              className="inline-block bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
