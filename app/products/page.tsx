'use client';

import React, { useState, useEffect, Suspense } from 'react';
import ProductCatalog from '@/components/products/ProductCatalog';
import ProductFilters from '@/components/products/ProductFilters';
import ProductListHeader from '@/components/products/ProductListHeader';
import ProductSearch from '@/components/products/ProductSearch';
import { useSearchParams } from 'next/navigation';

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [sortOption, setSortOption] = useState('popularity');
  const [products, setProducts] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle search submissions
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };
  
  // Fetch products based on filters, sorting, and pagination
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      
      // In a real implementation, you would fetch from your API
      // This is a simulated fetch with a timeout
      setTimeout(() => {
        // Sample product data - replace with actual fetch from API
        const mockProducts = Array(24).fill(null).map((_, index) => ({
          id: `prod-${index}`,
          name: `${['Elegant', 'Modern', 'Classic', 'Luxury'][index % 4]} ${['Chair', 'Table', 'Sofa', 'Backdrop', 'Linen', 'Candle', 'Centerpiece'][index % 7]}`,
          description: 'Perfect for weddings, parties, and special events.',
          price: 25 + (index % 10) * 12,
          category: ['furniture', 'decor', 'tableware', 'backdrops'][index % 4],
          subCategory: ['chairs', 'tables', 'linens', 'candles'][index % 4],
          rating: 3 + (index % 3),
          reviewCount: 5 + index,
          inStock: index % 7 !== 0,
          imageUrl: `/images/stock/category-${['accent-chairs', 'tables', 'linen', 'candle', 'backdrops', 'props'][index % 6]}.png`,
          isNew: index % 8 === 0,
          isPopular: index % 5 === 0,
        }));
        
        setProducts(mockProducts);
        setTotalProducts(156); // Total count for pagination
        setIsLoading(false);
      }, 800); // Simulate loading delay
    };

    fetchProducts();
  }, [searchParams, sortOption, currentPage, itemsPerPage, activeFilters]);

  // Handle filter changes
  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle clearing all filters
  const handleClearFilters = () => {
    setActiveFilters({});
    setCurrentPage(1);
  };

  // Handle removing a single filter
  const handleRemoveFilter = (filterType: string, value: string) => {
    const newFilters = { ...activeFilters };
    
    if (Array.isArray(newFilters[filterType])) {
      newFilters[filterType] = newFilters[filterType].filter((v: string) => v !== value);
      if (newFilters[filterType].length === 0) {
        delete newFilters[filterType];
      }
    } else {
      delete newFilters[filterType];
    }
    
    setActiveFilters(newFilters);
  };

  // Handle sort change
  const handleSortChange = (option: string) => {
    setSortOption(option);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle view mode change (grid/list)
  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  // Toggle mobile filters drawer
  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Our Rental Collection</h1>
        
        {/* Search component */}
        <ProductSearch 
          onSearch={handleSearch} 
          className="w-full md:w-72"
        />
      </div>
      
      {/* Product list header with sorting, view toggles, etc */}
      <ProductListHeader 
        totalProducts={totalProducts}
        shownProducts={products.length}
        sortOption={sortOption}
        onSortChange={handleSortChange}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onOpenMobileFilters={toggleMobileFilters}
      />
      
      {/* Active filters display */}
      {Object.keys(activeFilters).length > 0 && (
        <div className="flex flex-wrap gap-2 my-4">
          {Object.entries(activeFilters).map(([filterType, values]) => (
            Array.isArray(values) ? (
              values.map((value: string) => (
                <div key={`${filterType}-${value}`} className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {filterType}: {value}
                  <button onClick={() => handleRemoveFilter(filterType, value)} className="ml-2">
                    <span className="sr-only">Remove filter</span>
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <div key={filterType} className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                {filterType}: {String(values)}
                <button onClick={() => handleRemoveFilter(filterType, String(values))} className="ml-2">
                  <span className="sr-only">Remove filter</span>
                  ✕
                </button>
              </div>
            )
          ))}
          <button 
            onClick={handleClearFilters}
            className="text-sm text-[#D4AF37] hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
      
      <div className="mt-6 lg:grid lg:grid-cols-4 lg:gap-x-6">
        {/* Product filters sidebar - hidden on mobile until toggle */}
        <aside className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
          <ProductFilters
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            onCloseMobileFilters={toggleMobileFilters}
            isMobileOpen={mobileFiltersOpen}
          />
        </aside>
        
        {/* Product catalog grid/list */}
        <div className="lg:col-span-3">
          <ProductCatalog
            products={products}
            isLoading={isLoading}
            viewMode={viewMode}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalProducts={totalProducts}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      </main>
  );
}

// This is the main page component for the products catalog
export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading products…</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
