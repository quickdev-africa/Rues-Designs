'use client';


import React from 'react';
import SimpleHeroSection from '@/components/layout/SimpleHeroSection';
import ScrollingGallery, { GalleryImage } from '@/components/gallery/ScrollingGallery';

// Define gallery categories and their folder mapping
const galleryCategories = [
  { id: 'weddings', name: 'Weddings', folder: 'weddings' },
  { id: 'corporate', name: 'Corporate Events', folder: 'corporate' },
  { id: 'social', name: 'Social Gatherings', folder: 'social' },
  { id: 'celebration', name: 'Celebration of Life', folder: 'celebration' },
];

// Dynamically build gallery images from uploaded files
const weddingsImages = [
  "PHOTO-2025-06-22-13-44-32.jpg",
  "PHOTO-2025-06-22-13-45-48.jpg",
  "PHOTO-2025-06-22-13-47-55.jpg",
  "PHOTO-2025-06-22-13-48-31.jpg",
  "PHOTO-2025-06-22-13-49-06.jpg",
  "PHOTO-2025-06-22-13-49-24.jpg",
  "PHOTO-2025-06-22-14-13-09.jpg",
  "PHOTO-2025-06-22-14-13-24.jpg",
  "PHOTO-2025-06-22-14-13-39.jpg",
  "PHOTO-2025-06-22-14-13-56.jpg",
  "PHOTO-2025-06-22-14-14-12.jpg",
  "PHOTO-2025-06-22-14-14-27.jpg",
  "PHOTO-2025-06-22-14-14-44.jpg",
  "PHOTO-2025-06-22-14-15-09.jpg",
  "PHOTO-2025-06-22-14-15-25.jpg",
  "PHOTO-2025-06-22-14-15-38.jpg",
  "PHOTO-2025-06-22-14-15-54.jpg",
  "PHOTO-2025-06-22-14-16-10.jpg",
  "PHOTO-2025-06-22-14-16-32.jpg",
  "PHOTO-2025-06-22-14-16-50.jpg",
  "PHOTO-2025-06-22-14-17-04.jpg",
  "PHOTO-2025-06-22-14-17-22.jpg",
  "PHOTO-2025-06-22-14-17-42.jpg",
  "PHOTO-2025-06-22-14-17-59.jpg",
  "PHOTO-2025-06-22-14-18-14.jpg",
  "PHOTO-2025-06-22-14-30-29 2.jpg",
  "PHOTO-2025-06-22-14-30-29 3.jpg",
  "PHOTO-2025-06-22-14-30-29 4.jpg",
  "PHOTO-2025-06-22-14-30-29.jpg",
  "PHOTO-2025-06-22-14-30-30 2.jpg",
  "PHOTO-2025-06-22-14-30-30 3.jpg",
  "PHOTO-2025-06-22-14-30-30.jpg",
];
const corporateImages = [
  "PHOTO-2025-06-22-14-27-07 2.jpg",
  "PHOTO-2025-06-22-14-27-07 3.jpg",
  "PHOTO-2025-06-22-14-27-07 4.jpg",
  "PHOTO-2025-06-22-14-27-07.jpg",
];
const socialImages = [];
const celebrationImages = [];

const galleryImages: GalleryImage[] = [
  ...weddingsImages.map(filename => ({
    src: `/images/gallery/weddings/${filename}`,
    alt: '',
    category: 'Weddings',
  })),
  ...corporateImages.map(filename => ({
    src: `/images/gallery/corporate/${filename}`,
    alt: '',
    category: 'Corporate Events',
  })),
  ...socialImages.map(filename => ({
    src: `/images/gallery/social/${filename}`,
    alt: '',
    category: 'Social Gatherings',
  })),
  ...celebrationImages.map(filename => ({
    src: `/images/gallery/celebration/${filename}`,
    alt: '',
    category: 'Celebration of Life',
  })),
];

export default function GalleryPage() {
  return (
    <main>
      <SimpleHeroSection
        imageUrl="/images/hero_pg1.jpg"
        title="A glimpse of the magic."
        subtitle="From intimate gatherings to grand celebrations — here’s how it all comes together."
        height="h-[50vh]"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ScrollingGallery
          images={galleryImages}
          categories={galleryCategories.map(c => c.name)}
        />
      </div>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Own Event?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Let us help you design a beautiful, memorable event with our premium rental collection.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/shop/categories" 
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
