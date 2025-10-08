

import React from 'react';
import HeroSection from '@/components/shop/HeroSection';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { categories, Category } from '@/data/shopData';
import { placeholderImage } from '@/lib/placeholders';

export default function CollectionPage() {
  // Ensure categories is always an array
  const categoryArray: Category[] = Array.isArray(categories) ? categories : Object.values(categories);
  // Split categories into two rows for horizontal scroll
  const midpoint = Math.ceil(categoryArray.length / 2);
  const row1 = categoryArray.slice(0, midpoint);
  const row2 = categoryArray.slice(midpoint);

  const CategoryRow = ({ cats }: { cats: Category[] }) => (
    <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar"
      style={{ scrollSnapType: 'x mandatory' }}>
      {cats.map((category) => (
        <Link
          key={category.id}
          href={`/collection/${category.id}`}
          className="group min-w-[320px] max-w-xs bg-white rounded-xl shadow-lg flex flex-col justify-between p-6 mr-2"
          style={{ scrollSnapAlign: 'start' }}
        >
          <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
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
  );

  return (
    <div className="min-h-screen">
      <HeroSection
        imageUrl="/images/hero_pg2.jpg"
        title="Product Categories"
  description="Explore our premium event rental inventory by category. From tableware to furniture, we have everything to create your perfect event."
  height="large"
      />
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Collection', href: '/collection' }]}
        />
      </div>
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold mb-8">All Categories</h1>
        <div className="flex flex-col gap-8">
          <CategoryRow cats={row1} />
          <CategoryRow cats={row2} />
        </div>
      </section>
    </div>
  );
}
