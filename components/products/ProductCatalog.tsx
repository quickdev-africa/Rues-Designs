'use client';

import React from 'react';
import ProductCard from './ProductCard';
import ProductListItem from './ProductListItem';
import ProductSkeleton from './ProductSkeleton';

interface ProductCatalogProps {
  products: any[];
  isLoading: boolean;
  viewMode: 'grid' | 'list';
  currentPage: number;
  itemsPerPage: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
}

export default function ProductCatalog({
  products,
  isLoading,
  viewMode,
  currentPage,
  itemsPerPage,
  totalProducts,
  onPageChange,
}: ProductCatalogProps) {
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  
  // Generate an array for skeleton loading
  const skeletonArray = Array(itemsPerPage).fill(null);
  
  return (
    <div>
      {/* Product grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {isLoading
            ? skeletonArray.map((_, index) => (
                <ProductSkeleton key={index} viewMode="grid" />
              ))
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      ) : (
        <div className="space-y-6">
          {isLoading
            ? skeletonArray.map((_, index) => (
                <ProductSkeleton key={index} viewMode="list" />
              ))
            : products.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
        </div>
      )}
      
      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center mt-12 space-x-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-md ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            // Show limited pages with ellipsis for better UX
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === page
                      ? 'bg-[#D4AF37] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              );
            } else if (
              (page === currentPage - 2 && currentPage > 3) ||
              (page === currentPage + 2 && currentPage < totalPages - 2)
            ) {
              return <span key={page} className="px-2 py-2 text-gray-500">...</span>;
            }
            return null;
          })}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-md ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Next
          </button>
        </div>
      )}
      
      {/* Empty state */}
      {!isLoading && products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m-6-8h6M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
          <p className="text-gray-500 mb-4 text-center max-w-md">
            We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
          </p>
        </div>
      )}
    </div>
  );
}
