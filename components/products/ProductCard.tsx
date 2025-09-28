'use client';

import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import Link from 'next/link';
import { OptimizedImage } from '../OptimizedImage';

interface ProductCardProps {
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

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };
  
  return (
    <div 
      className="group relative rounded-lg border border-gray-200 overflow-hidden flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
      
      {/* Wishlist button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-all duration-200"
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart 
          size={18} 
          className={isWishlisted ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-600'} 
        />
      </button>
      
      {/* Product image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <OptimizedImage 
          src={product.imageUrl} 
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Quick action buttons - visible on hover */}
        <div 
          className={`absolute inset-0 flex items-center justify-center gap-2 bg-black/30 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Link
            href={`/products/${product.id}`}
            className="bg-white p-2 rounded-full shadow-md hover:bg-[#D4AF37] hover:text-white transition-colors duration-200"
          >
            <Eye size={18} />
            <span className="sr-only">Quick view</span>
          </Link>
          <button
            className="bg-white p-2 rounded-full shadow-md hover:bg-[#D4AF37] hover:text-white transition-colors duration-200"
            disabled={!product.inStock}
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
            <span className="sr-only">Add to cart</span>
          </button>
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Category */}
        <div className="text-xs text-gray-500 mb-1 capitalize">
          {product.category}
        </div>
        
        {/* Product name */}
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-sm font-medium text-gray-900 hover:text-[#D4AF37] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Star rating */}
        <div className="flex items-center mt-1">
          <div className="flex items-center">
            {Array(5).fill(null).map((_, i) => (
              <span key={i} className={`text-xs ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                ★
              </span>
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
        </div>
        
        <div className="mt-auto pt-2">
          {/* Price */}
          <div className="text-[#D4AF37] font-bold">
            ${product.price.toFixed(2)}<span className="text-xs font-normal text-gray-600"> /day</span>
          </div>
          
          {/* Stock status */}
          <div className="text-xs mt-1">
            {product.inStock ? (
              <span className="text-green-600">Available for rent</span>
            ) : (
              <span className="text-red-600">Currently unavailable</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
