'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import ProductCatalog from '../../components/shop/ProductCatalog';
import ProductFilters from '../../components/shop/ProductFilters';
import ProductListHeader from '../../components/shop/ProductListHeader';
import ProductSearch from '../../components/shop/ProductSearch';
import { useSearchParams } from 'next/navigation';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import { categories } from '@/data/shopData';

// This is the main page component for the shop
function ShopPageContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get('category');
  
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilters, setActiveFilters] = useState<any>(
    categoryParam ? { categories: [categoryParam] } : {}
  );
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
  
  // Update document title with category if present
  useEffect(() => {
    if (categoryParam) {
      // Find the category name for the document title
      const categoryName = categories.find(cat => cat.id === categoryParam)?.name || 'Products';
      document.title = `${categoryName} - Rues Design Shop`;
    } else {
      document.title = 'Shop - Rues Design';
    }
  }, [categoryParam]);
  
  // Update filters when URL parameters change
  useEffect(() => {
    if (categoryParam) {
      // Check if we need to update the filters
      const shouldUpdate = !activeFilters.categories || 
                          !activeFilters.categories.includes(categoryParam);
      
      if (shouldUpdate) {
        setActiveFilters(prev => ({
          ...prev,
          categories: [categoryParam]
        }));
        
        // Also select the category to display subcategories
        const categoryElement = document.getElementById(`category-${categoryParam}`) as HTMLInputElement;
        if (categoryElement && categoryElement instanceof HTMLInputElement) {
          categoryElement.checked = true;
        }
      }
    }
  }, [categoryParam, activeFilters.categories]);
  
  // Fetch products based on filters, sorting, and pagination
  // Create mock product data
  const mockProductData = useMemo(() => {
    return Array(24).fill(null).map((_, index) => {
      // Create a mapping of indices to categories and their appropriate subcategories and images
      const categoryMapping = [
        { 
          category: 'tabletop', 
          subCategory: 'plates',
          name: 'Gold Rimmed Charger Plate',
          description: 'Elegant gold-rimmed charger plate, perfect for luxurious table settings.',
          imageUrl: '/images/stock/category-tabletop.png'
        },
        { 
          category: 'linen', 
          subCategory: 'tablecloths',
          name: 'White Satin Tablecloth',
          description: 'Premium white satin tablecloth for a sophisticated table setting.',
          imageUrl: '/images/stock/category-linen.png'
        },
        { 
          category: 'accent-chairs', 
          subCategory: 'lounge-chairs',
          name: 'Velvet Lounge Chair',
          description: 'Comfortable velvet lounge chair, ideal for event seating areas.',
          imageUrl: '/images/stock/category-accent-chairs.png'
        },
        { 
          category: 'tables', 
          subCategory: 'round-tables',
          name: 'Round Dining Table',
          description: 'Classic round dining table, seats up to 8 guests comfortably.',
          imageUrl: '/images/stock/category-tables.png'
        },
        { 
          category: 'candles', 
          subCategory: 'taper-holders',
          name: 'Crystal Candle Holder',
          description: 'Elegant crystal candle holder to elevate your table decor.',
          imageUrl: '/images/stock/category-candle.png'
        },
        { 
          category: 'backdrops', 
          subCategory: 'flower-walls',
          name: 'White Rose Backdrop',
          description: 'Stunning white rose backdrop, perfect for ceremonies and photo areas.',
          imageUrl: '/images/stock/category-backdrops.png'
        },
        { 
          category: 'sofas', 
          subCategory: 'three-seater',
          name: 'Luxe Velvet Sofa',
          description: 'Plush velvet sofa for comfortable lounge areas at your event.',
          imageUrl: '/images/stock/category-sofas.png'
        },
        { 
          category: 'props', 
          subCategory: 'signage',
          name: 'Welcome Sign',
          description: 'Elegant acrylic welcome sign for greeting your guests in style.',
          imageUrl: '/images/stock/category-props.png'
        }
      ];
      
      // Get a category based on the index
      const productType = categoryMapping[index % categoryMapping.length];
      
      return {
        id: `prod-${index}`,
        name: productType.name,
        description: productType.description,
        price: 25 + (index % 15) * 10,
        category: productType.category,
        subCategory: productType.subCategory,
        rating: 3 + (index % 3),
        reviewCount: 5 + index,
        inStock: index % 7 !== 0,
        imageUrl: productType.imageUrl,
        isNew: index % 8 === 0,
        isPopular: index % 5 === 0,
      };
    });
  }, []);
  
  // Use our custom hook to filter and sort products
  const filtersWithSearch = useMemo(() => {
    return {
      ...activeFilters,
      search: searchQuery
    };
  }, [activeFilters, searchQuery]);
  
  const filteredProductList = useFilteredProducts(mockProductData, filtersWithSearch, sortOption);
  
  // Simulate API fetch with loading state
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Get paginated results
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedProducts = filteredProductList.slice(startIndex, endIndex);
      
      setProducts(paginatedProducts);
      setTotalProducts(filteredProductList.length);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [currentPage, itemsPerPage, filteredProductList]);

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
        <h1 className="text-3xl font-bold text-gray-900">Shop Our Collection</h1>
        
        {/* Search component */}
        <ProductSearch 
          onSearch={handleSearch} 
          className="w-full md:w-72"
        />
      </div>
      
      {/* Categories Banner */}
      <div className="bg-gradient-to-r from-[#31473A] to-[#3c5848] rounded-lg mb-8 overflow-hidden shadow-md relative">
        <div className="px-6 py-6 md:py-8 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">Browse By Category</h2>
            <p className="text-white/80 mb-4 md:mb-0">
              Explore our extensive collection of premium rental items organized by category
            </p>
          </div>
          <Link 
            href="/shop/categories" 
            className="px-6 py-3 bg-white text-[#31473A] rounded-md font-medium hover:bg-[#D4AF37] hover:text-white transition-colors duration-200 whitespace-nowrap"
          >
            View All Categories
          </Link>
        </div>
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

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading shop…</div>}>
      <ShopPageContent />
    </Suspense>
  );
}
