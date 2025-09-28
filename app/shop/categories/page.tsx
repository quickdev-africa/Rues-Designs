'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '../../../components/shop/HeroSection';
import Breadcrumbs from '../../../components/ui/Breadcrumbs';
import { categories } from '../../../data/shopData';
import { placeholderImage } from '../../../lib/placeholders';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroSection 
        title="Product Categories"
        description="Explore our premium event rental inventory by category. From tableware to furniture, we have everything to create your perfect event."
        imageUrl={placeholderImage("/images/stock/categories-hero.jpg")}
        height="medium"
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
      
      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold mb-8">All Categories</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <Link 
              key={category.id} 
              href={`/shop/category/${category.id}`}
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
                {category.imageUrl ? (
                  <Image 
                    src={placeholderImage(category.imageUrl)} 
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    <span className="text-gray-400">{category.name}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end transition-opacity group-hover:bg-opacity-20">
                  <div className="p-4 w-full bg-gradient-to-t from-black to-transparent">
                    <h3 className="font-semibold text-white text-lg">{category.name}</h3>
                    <p className="text-white text-sm opacity-80">{category.count} items</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
