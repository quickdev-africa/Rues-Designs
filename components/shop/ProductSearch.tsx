'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Sample search results for the autocomplete demo
// In production, this would come from your API
const sampleProducts = [
  {
    id: 'product-1',
    name: 'Gold Rimmed Charger Plate',
    category: 'Tableware',
    price: 8.99,
    imageUrl: '/images/stock/category-linen.png'
  },
  {
    id: 'product-2',
    name: 'Velvet Lounge Chair',
    category: 'Furniture',
    price: 45.99,
    imageUrl: '/images/stock/category-accent-chairs.png'
  },
  {
    id: 'product-3',
    name: 'Crystal Champagne Flute',
    category: 'Tableware',
    price: 6.50,
    imageUrl: '/images/stock/category-tabletop.png'
  },
  {
    id: 'product-4',
    name: 'Floral Backdrop',
    category: 'Backdrops',
    price: 150.00,
    imageUrl: '/images/stock/category-backdrops.png'
  },
  {
    id: 'product-5',
    name: 'Taper Candle Holder Set',
    category: 'Decor',
    price: 12.99,
    imageUrl: '/images/stock/category-candle.png'
  }
];

interface ProductSearchProps {
  onSearch: (searchTerm: string) => void;
  className?: string;
}

export default function ProductSearch({ onSearch, className = '' }: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Filter sample products based on search term
    // In production, this would be an API call
    if (value.length > 1) {
      const filtered = sampleProducts.filter(product => 
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setIsActive(true);
    } else {
      setResults([]);
      setIsActive(false);
    }
  };
  
  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      onSearch(searchTerm);
      setIsActive(false);
    }
  };
  
  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setResults([]);
    setIsActive(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="w-full border-gray-300 rounded-md pl-10 pr-10 py-2 focus:ring focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] transition-colors"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        
        {searchTerm && (
          <button 
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <X size={18} className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </form>
      
      {/* Search results dropdown */}
      {isActive && results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="max-h-60 overflow-y-auto py-2">
            {results.map((product) => (
              <li key={product.id}>
                <Link 
                  href={`/shop/${product.id}`} 
                  className="flex items-center px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsActive(false)}
                >
                  <div className="relative h-12 w-12 flex-shrink-0 bg-gray-100 rounded">
                    <Image 
                      src={product.imageUrl} 
                      alt={product.name}
                      fill
                      sizes="48px"
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-sm font-medium text-[#D4AF37]">
                    ${product.price.toFixed(2)}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-4 py-2 border-t border-gray-100">
            <button
              onClick={handleSubmit}
              className="text-sm text-[#D4AF37] hover:underline w-full text-center"
            >
              View all results
            </button>
          </div>
        </div>
      )}
      
      {isActive && searchTerm && results.length === 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-4 text-center">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  );
}
