'use client';

import React from 'react';
import ProductCard from '../products/ProductCard';
import { placeholderImage } from '../../lib/placeholders';

interface ProductGridProps {
  products: any[]; // Accepts Supabase-mapped products
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-600">No products found in this category.</p>
      </div>
    );
  }

  // Map Supabase product data to ProductCard shape
  const mappedProducts = products.map((product: any) => ({
    id: product.id,
    name: product.name,
    description: product.description || '',
    price: product.price ?? product.daily_rate ?? 0,
    priceType: product.priceType ?? 'day',
    category: product.category ?? '',
    subCategory: product.subCategory ?? '',
    rating: product.rating ?? 5,
    reviewCount: product.reviewCount ?? 0,
    inStock: product.available ?? true,
    imageUrl: (product.images && Array.isArray(product.images) && product.images[0]) ? product.images[0] : placeholderImage('No image'),
    isNew: product.isNew ?? false,
    isPopular: product.isPopular ?? false,
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {mappedProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
