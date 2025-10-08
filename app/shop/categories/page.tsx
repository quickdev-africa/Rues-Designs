'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SimpleHeroSection from '../../../components/layout/SimpleHeroSection';
import Breadcrumbs from '../../../components/ui/Breadcrumbs';
import { categories } from '../../../data/shopData';
import { placeholderImage } from '../../../lib/placeholders';
import ScrollArrow from '../../../components/ui/ScrollArrow';

export default function CategoriesPage() {
  // Split categories into two rows: 8 in row 1, 7 in row 2
  const row1 = categories.slice(0, 8);
  const row2 = categories.slice(8);

  const CategoryRow = ({ cats }: { cats: typeof categories }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    useEffect(() => {
      const el = scrollRef.current;
      if (!el) return;
      const handleScroll = () => {
        setShowLeft(el.scrollLeft > 10);
        setShowRight(el.scrollLeft + el.offsetWidth < el.scrollWidth - 10);
      };
      el.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      return () => el.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-4 pt-8 px-8 hide-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {cats.map(category => (
            <Link
              key={category.id}
              href={`/shop/category/${category.id}`}
              className="group min-w-[400px] max-w-[400px] bg-gray-100 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.18)] flex flex-col justify-between p-8 mr-4 border-0"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="relative aspect-[4/4.5] overflow-hidden mb-4 bg-white rounded-2xl" style={{ height: '90%' }}>
                {category.imageUrl ? (
                  <Image
                    src={placeholderImage(category.imageUrl)}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    <span className="text-gray-400">{category.name}</span>
                  </div>
                )}
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900">{category.name}</h3>
              <p className="text-gray-600 text-base mb-2">{category.count} items</p>
            </Link>
          ))}
        </div>
        {/* Overlay arrows */}
        <ScrollArrow direction="left" visible={showLeft} />
        <ScrollArrow direction="right" visible={showRight} />
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <SimpleHeroSection
        imageUrl="/images/stock/collection-hero2.jpg" // Updated to the new vivid, clear image
  title="Get your perfect party."
        subtitle="Pair your event with the right decor, rentals, and extras — all in stunning styles and vibrant themes."
        height="h-[50vh]"
      />

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            { label: 'Categories', href: '/shop/categories' }
          ]}
        />
      </div>

      {/* Categories Scrollable Rows */}
      <section className="container mx-auto px-4 py-12">
  <h1 className="text-3xl font-semibold mb-8">All Collections</h1>
        <div className="flex flex-col gap-8">
          <CategoryRow cats={row1} />
          <CategoryRow cats={row2} />
        </div>
      </section>
    </div>
  );
}
