'use client';

import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductListItemProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    subCategory: string;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    imageUrl: string;
    isNew?: boolean;
    isPopular?: boolean;
  };
}

export default function ProductListItem({ product }: ProductListItemProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };
  
  return (
    <div className="flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {/* Product image - takes full width on mobile, fixed width on desktop */}
      <div className="relative w-full sm:w-56 h-60 sm:h-48 bg-gray-100">
        <Image 
          src={product.imageUrl} 
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, 224px"
          className="object-cover object-center"
        />
        
        {/* Product badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-[#D4AF37] text-white px-2 py-0.5 text-xs font-medium rounded">New</span>
          )}
          {product.isPopular && (
            <span className="bg-[#2C3E50] text-white px-2 py-0.5 text-xs font-medium rounded">Popular</span>
          )}
          {!product.inStock && (
            <span className="bg-red-600 text-white px-2 py-0.5 text-xs font-medium rounded">Unavailable</span>
          )}
        </div>
      </div>
      
      {/* Product details */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            {/* Category */}
            <div className="text-xs text-gray-500 mb-1 capitalize">
              {product.category} / {product.subCategory}
            </div>
            
            {/* Product name */}
            <Link href={`/products/${product.id}`} className="block">
              <h3 className="text-lg font-medium text-gray-900 hover:text-[#D4AF37] transition-colors">
                {product.name}
              </h3>
            </Link>
            
            {/* Star rating */}
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                {Array(5).fill(null).map((_, i) => (
                  <span key={i} className={`${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="ml-1 text-sm text-gray-500">({product.reviewCount} reviews)</span>
            </div>
          </div>
          
          {/* Price - will stack below on mobile */}
          <div className="text-lg text-[#D4AF37] font-bold whitespace-nowrap ml-4">
            ${product.price.toFixed(2)}<span className="text-sm font-normal text-gray-600"> /day</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mt-2">
          {product.description}
        </p>
        
        {/* Bottom section with status and actions */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          {/* Stock status */}
          <div>
            {product.inStock ? (
              <span className="text-sm text-green-600">Available for rent</span>
            ) : (
              <span className="text-sm text-red-600">Currently unavailable</span>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleWishlistToggle}
              className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart 
                size={18} 
                className={isWishlisted ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-600'} 
              />
            </button>
            
            <Link
              href={`/products/${product.id}`}
              className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Eye size={18} className="text-gray-600" />
              <span className="sr-only">Quick view</span>
            </Link>
            
            <button
              className="flex items-center gap-1 bg-[#D4AF37] hover:bg-[#C09F27] text-white rounded-full px-3 py-1.5 text-sm transition-colors"
              disabled={!product.inStock}
            >
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
