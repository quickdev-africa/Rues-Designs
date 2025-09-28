'use client';

import React from 'react';
import Link from 'next/link';
import { OptimizedImage } from '../OptimizedImage';
import { Product } from '../../data/shopData';
import { formatPrice } from '../../lib/utils';
import { placeholderImage } from '../../lib/placeholders';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-600">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <div key={product.id} className="group">
          <Link href={`/shop/product/${product.slug}`} className="block">
            <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
              {product.images && product.images.length > 0 ? (
                <OptimizedImage 
                  src={placeholderImage(product.images[0])} 
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={product.featured}
                />
              ) : (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              
              {!product.available && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-medium px-3 py-1 bg-black bg-opacity-75 rounded-md">
                    Currently Unavailable
                  </span>
                </div>
              )}
            </div>
            
            <h3 className="font-medium text-gray-900 mb-1 group-hover:text-brand-primary">
              {product.name}
            </h3>
            
            <p className="text-sm font-medium text-brand-primary">
              {formatPrice(product.price)} / {product.priceType}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
