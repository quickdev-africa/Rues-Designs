'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { categories, subCategories, priceRanges } from '@/data/shopData';

interface ProductFiltersProps {
  activeFilters: any;
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
  onCloseMobileFilters: () => void;
  isMobileOpen: boolean;
}

export default function ProductFilters({
  activeFilters,
  onFilterChange,
  onClearFilters,
  onCloseMobileFilters,
  isMobileOpen
}: ProductFiltersProps) {
  // Initialize the selected category from active filters if available
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    activeFilters.categories?.length ? activeFilters.categories[0] : null
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [customPriceMin, setCustomPriceMin] = useState<string>('');
  const [customPriceMax, setCustomPriceMax] = useState<string>('');

  // Handle category selection
  const handleCategoryChange = (categoryId: string) => {
    const newFilters = { ...activeFilters };
    
    // If already selected, remove it
    if (newFilters.categories?.includes(categoryId)) {
      newFilters.categories = newFilters.categories.filter((id: string) => id !== categoryId);
      if (newFilters.categories.length === 0) delete newFilters.categories;
      
      // Also remove any subcategories from this category
      if (newFilters.subcategories) {
        const subCatsToKeep = newFilters.subcategories.filter((subCat: string) => {
          // Keep subcategories that don't belong to the removed category
          return !subCategories[categoryId]?.some(sc => sc.id === subCat);
        });
        
        if (subCatsToKeep.length === 0) {
          delete newFilters.subcategories;
        } else {
          newFilters.subcategories = subCatsToKeep;
        }
      }
      
      // Update selected category state
      if (selectedCategory === categoryId) {
        setSelectedCategory(null);
      }
    } else {
      // Add the category
      if (!newFilters.categories) {
        newFilters.categories = [];
      }
      newFilters.categories.push(categoryId);
      setSelectedCategory(categoryId);
    }
    
    onFilterChange(newFilters);
  };

  // Handle subcategory selection
  const handleSubCategoryChange = (subcategoryId: string) => {
    const newFilters = { ...activeFilters };
    
    if (!newFilters.subcategories) {
      newFilters.subcategories = [];
    }
    
    if (newFilters.subcategories.includes(subcategoryId)) {
      newFilters.subcategories = newFilters.subcategories.filter((id: string) => id !== subcategoryId);
      if (newFilters.subcategories.length === 0) delete newFilters.subcategories;
    } else {
      newFilters.subcategories.push(subcategoryId);
    }
    
    onFilterChange(newFilters);
  };

  // Handle price range selection
  const handlePriceRangeChange = (rangeId: string, min: number, max: number | null) => {
    const newFilters = { ...activeFilters };
    
    if (newFilters.priceRange === rangeId) {
      delete newFilters.priceRange;
      delete newFilters.minPrice;
      delete newFilters.maxPrice;
    } else {
      newFilters.priceRange = rangeId;
      newFilters.minPrice = min;
      if (max !== null) {
        newFilters.maxPrice = max;
      } else {
        delete newFilters.maxPrice;
      }
    }
    
    onFilterChange(newFilters);
  };

  // Handle custom price range
  const handleApplyCustomPrice = () => {
    if (customPriceMin || customPriceMax) {
      const newFilters = { ...activeFilters };
      
      if (customPriceMin) {
        newFilters.minPrice = parseInt(customPriceMin);
      } else {
        delete newFilters.minPrice;
      }
      
      if (customPriceMax) {
        newFilters.maxPrice = parseInt(customPriceMax);
      } else {
        delete newFilters.maxPrice;
      }
      
      delete newFilters.priceRange; // Remove any pre-set price range
      newFilters.priceRange = 'custom';
      
      onFilterChange(newFilters);
    }
  };
  
  // Update selected category when active filters change
  useEffect(() => {
    if (activeFilters.categories?.length) {
      setSelectedCategory(activeFilters.categories[0]);
    } else {
      setSelectedCategory(null);
    }
  }, [activeFilters.categories]);

  // Handle availability date changes
  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    
    const newFilters = { ...activeFilters };
    
    if (start && end) {
      newFilters.availabilityStart = start.toISOString();
      newFilters.availabilityEnd = end.toISOString();
    } else {
      delete newFilters.availabilityStart;
      delete newFilters.availabilityEnd;
    }
    
    onFilterChange(newFilters);
  };

  // Handle rating filter
  const handleRatingChange = (rating: number) => {
    const newFilters = { ...activeFilters };
    
    if (newFilters.minRating === rating) {
      delete newFilters.minRating;
    } else {
      newFilters.minRating = rating;
    }
    
    onFilterChange(newFilters);
  };

  // Handle availability filter
  const handleAvailabilityChange = (isAvailable: boolean) => {
    const newFilters = { ...activeFilters };
    
    if (newFilters.inStock === isAvailable) {
      delete newFilters.inStock;
    } else {
      newFilters.inStock = isAvailable;
    }
    
    onFilterChange(newFilters);
  };

  return (
    <div className={`bg-white ${isMobileOpen ? 'fixed inset-0 z-40 overflow-y-auto p-4 md:p-6' : ''} lg:static`}>
      {/* Mobile header */}
      {isMobileOpen && (
        <div className="flex items-center justify-between mb-5 pb-2 border-b lg:hidden">
          <h3 className="text-lg font-medium">Filters</h3>
          <button 
            onClick={onCloseMobileFilters}
            className="p-1.5 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
            <span className="sr-only">Close filters</span>
          </button>
        </div>
      )}
      
      {/* Clear all filters button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        {Object.keys(activeFilters).length > 0 && (
          <button 
            onClick={onClearFilters}
            className="text-sm text-[#D4AF37] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
      
      {/* Categories filter */}
      <div className="border-b pb-4 mb-4">
        <h3 className="text-md font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={`category-${category.id}`}
                  type="checkbox"
                  checked={activeFilters.categories?.includes(category.id) || false}
                  onChange={() => handleCategoryChange(category.id)}
                  className="h-4 w-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={`category-${category.id}`} className="font-medium text-gray-700">
                  {category.name} <span className="text-gray-500">({category.count})</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Sub-categories filter - only show if a category is selected */}
      {selectedCategory && subCategories[selectedCategory] && (
        <div className="border-b pb-4 mb-4">
          <h3 className="text-md font-medium mb-3">Sub-categories</h3>
          <div className="space-y-2 ml-4">
            {subCategories[selectedCategory].map((subCategory) => (
              <div key={subCategory.id} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={`subcategory-${subCategory.id}`}
                    type="checkbox"
                    checked={activeFilters.subcategories?.includes(subCategory.id) || false}
                    onChange={() => handleSubCategoryChange(subCategory.id)}
                    className="h-4 w-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={`subcategory-${subCategory.id}`} className="font-medium text-gray-700">
                    {subCategory.name} <span className="text-gray-500">({subCategory.count})</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Show message if no category is selected */}
      {!selectedCategory && (
        <div className="border-b pb-4 mb-4">
          <p className="text-sm text-gray-500">
            Select a category above to see available subcategories
          </p>
        </div>
      )}
      
      {/* Price range filter */}
      <div className="border-b pb-4 mb-4">
        <h3 className="text-md font-medium mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={`price-${range.id}`}
                  type="radio"
                  checked={activeFilters.priceRange === range.id}
                  onChange={() => handlePriceRangeChange(range.id, range.min, range.max)}
                  className="h-4 w-4 border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={`price-${range.id}`} className="font-medium text-gray-700">
                  {range.name}
                </label>
              </div>
            </div>
          ))}
          
          {/* Custom price range */}
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <div>
                <label htmlFor="min-price" className="sr-only">Minimum price</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    name="min-price"
                    id="min-price"
                    placeholder="Min"
                    value={customPriceMin}
                    onChange={(e) => setCustomPriceMin(e.target.value)}
                    className="block w-full rounded-md border-gray-300 pl-7 pr-3 text-sm focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                </div>
              </div>
              <span className="text-gray-500">-</span>
              <div>
                <label htmlFor="max-price" className="sr-only">Maximum price</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    name="max-price"
                    id="max-price"
                    placeholder="Max"
                    value={customPriceMax}
                    onChange={(e) => setCustomPriceMax(e.target.value)}
                    className="block w-full rounded-md border-gray-300 pl-7 pr-3 text-sm focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                </div>
              </div>
              <button
                onClick={handleApplyCustomPrice}
                className="bg-[#D4AF37] text-white rounded px-3 py-1.5 text-sm"
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Availability dates filter */}
      <div className="border-b pb-4 mb-4">
        <h3 className="text-md font-medium mb-3">Availability</h3>
        <div className="mb-3">
          <DatePicker
            selected={startDate}
            onChange={(dates) => handleDateChange(dates as [Date | null, Date | null])}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            className="w-full"
            calendarClassName="w-full"
          />
        </div>
        <div className="mt-2">
          <button 
            onClick={() => {
              setStartDate(null);
              setEndDate(null);
              const newFilters = { ...activeFilters };
              delete newFilters.availabilityStart;
              delete newFilters.availabilityEnd;
              onFilterChange(newFilters);
            }}
            className="text-sm text-[#D4AF37] hover:underline"
          >
            Clear dates
          </button>
        </div>
      </div>
      
      {/* Rating filter */}
      <div className="border-b pb-4 mb-4">
        <h3 className="text-md font-medium mb-3">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <input
                id={`rating-${rating}`}
                type="radio"
                name="rating"
                checked={activeFilters.minRating === rating}
                onChange={() => handleRatingChange(rating)}
                className="h-4 w-4 border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <label htmlFor={`rating-${rating}`} className="ml-3 flex items-center">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>★</span>
                ))}
                <span className="ml-1 text-sm text-gray-600">& up</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* In stock filter */}
      <div className="pb-4 mb-4">
        <h3 className="text-md font-medium mb-3">Availability Status</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="in-stock"
              type="checkbox"
              checked={activeFilters.inStock === true}
              onChange={() => handleAvailabilityChange(true)}
              className="h-4 w-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
            />
            <label htmlFor="in-stock" className="ml-3 text-sm text-gray-700">
              In stock only
            </label>
          </div>
        </div>
      </div>
      
      {/* Mobile apply button */}
      {isMobileOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
          <button
            onClick={onCloseMobileFilters}
            className="w-full bg-[#D4AF37] text-white rounded-md py-2 font-medium"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}
