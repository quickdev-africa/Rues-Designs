import { useMemo } from 'react';

export interface Product {
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
  isNew: boolean;
  isPopular: boolean;
}

export interface Filters {
  categories?: string[];
  subcategories?: string[];
  priceRange?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  availabilityStart?: string;
  availabilityEnd?: string;
  search?: string;
}

export function useFilteredProducts(products: Product[], filters: Filters, sortOption: string) {
  const filteredAndSortedProducts = useMemo(() => {
    // Start with all products
    let filteredProducts = [...products];
    
    // Apply category filter
    if (filters.categories?.length) {
      filteredProducts = filteredProducts.filter(product =>
        filters.categories!.includes(product.category)
      );
    }
    
    // Apply subcategory filter
    if (filters.subcategories?.length) {
      filteredProducts = filteredProducts.filter(product =>
        filters.subcategories!.includes(product.subCategory)
      );
    }
    
    // Apply price filter
    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= filters.minPrice!
      );
    }
    
    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= filters.maxPrice!
      );
    }
    
    // Apply rating filter
    if (filters.minRating !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.rating >= filters.minRating!
      );
    }
    
    // Apply availability filter
    if (filters.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.inStock === filters.inStock
      );
    }
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.subCategory.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    if (sortOption) {
      switch (sortOption) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filteredProducts.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
          break;
        case 'popularity':
        default:
          filteredProducts.sort((a, b) => (a.isPopular === b.isPopular) ? 0 : a.isPopular ? -1 : 1);
          break;
      }
    }
    
    return filteredProducts;
  }, [products, filters, sortOption]);
  
  return filteredAndSortedProducts;
}
