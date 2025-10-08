"use client";
import React, { useState } from 'react';
import Image from 'next/image';

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

interface ScrollingGalleryProps {
  images: GalleryImage[];
  categories: string[];
}

const ANIMATION_DURATION = 18; // seconds for one full scroll (faster)

export default function ScrollingGallery({ images, categories }: ScrollingGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  // Filter images by category
  const filteredImages = activeCategory === 'All'
    ? images
    : images.filter(img => img.category === activeCategory);

  // Duplicate images for seamless scroll (2x)
  const scrollImages = [...filteredImages, ...filteredImages];

  // Modal navigation
  const handleImageClick = (idx: number) => setModalIndex(idx % filteredImages.length);
  const handleCloseModal = () => setModalIndex(null);
  const handlePrev = () => setModalIndex(idx => (idx !== null ? (idx - 1 + filteredImages.length) % filteredImages.length : null));
  const handleNext = () => setModalIndex(idx => (idx !== null ? (idx + 1) % filteredImages.length : null));

  return (
    <div className="w-screen max-w-none relative left-1/2 right-1/2 -mx-[50vw]">
      {/* Category Filters */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {['All', ...categories].map(cat => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === cat ? 'bg-[#D4AF37] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Scrolling Rows */}
      <div className="space-y-8">
        {[0, 1].map(rowIdx => (
          <div
            key={rowIdx}
            className={`flex whitespace-nowrap w-full scrolling-row${rowIdx}`}
            style={{
              animation: `scrollRow${rowIdx} ${ANIMATION_DURATION}s linear infinite`,
              animationPlayState: 'running',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.animationDuration = '40s';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.animationDuration = `${ANIMATION_DURATION}s`;
            }}
          >
            {scrollImages.map((img, idx) => (
              <div
                key={idx}
                className="inline-block mx-4 w-[90vw] max-w-lg h-[60vw] max-h-[28rem] md:w-[32rem] md:h-[20rem] cursor-pointer relative"
                style={{ minWidth: '320px', minHeight: '220px' }}
                onClick={() => handleImageClick(idx)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 95vw, (max-width: 1024px) 60vw, 33vw"
                  className="object-cover rounded-xl shadow-lg"
                  style={{ borderRadius: '1rem' }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Modal */}
      {modalIndex !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-0" onClick={handleCloseModal}>
          <div className="relative w-full max-w-5xl bg-white rounded-lg overflow-hidden flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            <div className="relative w-full h-[70vh] flex items-center justify-center">
              <Image
                src={filteredImages[modalIndex].src}
                alt={filteredImages[modalIndex].alt}
                fill
                className="object-contain"
              />
              {/* Left Arrow */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                onClick={handlePrev}
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              {/* Right Arrow */}
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                onClick={handleNext}
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            {/* Remove filename/number below image */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      )}
      {/* CSS Keyframes for scrolling rows */}
      <style jsx>{`
        @keyframes scrollRow0 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRow1 {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
