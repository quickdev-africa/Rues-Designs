'use client';

import React from 'react';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';

interface ProductListHeaderProps {
  totalProducts: number;
  shownProducts: number;
  sortOption: string;
  viewMode: 'grid' | 'list';
  onSortChange: (option: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onOpenMobileFilters: () => void;
}

export default function ProductListHeader({
  totalProducts,
  shownProducts,
  sortOption,
  viewMode,
  onSortChange,
  onViewModeChange,
  onOpenMobileFilters,
}: ProductListHeaderProps) {
  return (
    <div className="bg-white border-b pb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Results counter */}
        <div className="text-sm text-gray-600">
          Showing {shownProducts} of {totalProducts} products
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Mobile filter button */}
          <button 
            onClick={onOpenMobileFilters}
            className="flex items-center text-sm font-medium text-gray-700 lg:hidden"
          >
            <SlidersHorizontal size={18} className="mr-1.5" />
            Filters
          </button>
          
          {/* Sort options */}
          <div className="flex items-center">
            <label htmlFor="sort" className="text-sm text-gray-600 mr-2">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="text-sm border-gray-300 rounded py-1.5 px-2 focus:border-[#D4AF37] focus:ring focus:ring-[#D4AF37] focus:ring-opacity-20"
            >
              <option value="popularity">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
          
          {/* View mode toggles */}
          <div className="flex items-center border rounded overflow-hidden">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 ${viewMode === 'grid' ? 'bg-[#D4AF37] text-white' : 'bg-white text-gray-600'}`}
              aria-label="Grid view"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 ${viewMode === 'list' ? 'bg-[#D4AF37] text-white' : 'bg-white text-gray-600'}`}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
