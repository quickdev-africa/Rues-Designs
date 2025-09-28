'use client';

import React from 'react';

interface ProductSkeletonProps {
  viewMode: 'grid' | 'list';
}

export default function ProductSkeleton({ viewMode }: ProductSkeletonProps) {
  if (viewMode === 'grid') {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden animate-pulse">
        {/* Image placeholder */}
        <div className="aspect-square w-full bg-gray-200"></div>
        
        {/* Content placeholders */}
        <div className="p-4">
          <div className="h-2 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
          <div className="flex gap-1 my-2">
            <div className="h-3 w-3 bg-gray-200 rounded"></div>
            <div className="h-3 w-3 bg-gray-200 rounded"></div>
            <div className="h-3 w-3 bg-gray-200 rounded"></div>
            <div className="h-3 w-3 bg-gray-200 rounded"></div>
            <div className="h-3 w-3 bg-gray-200 rounded"></div>
          </div>
          <div className="h-5 bg-gray-200 rounded w-1/3 mt-3"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3 mt-2"></div>
        </div>
      </div>
    );
  }
  
  // List view skeleton
  return (
    <div className="flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="w-full sm:w-56 h-60 sm:h-48 bg-gray-200"></div>
      
      {/* Content placeholders */}
      <div className="flex-1 p-4">
        <div className="flex justify-between items-start">
          <div className="w-2/3">
            <div className="h-2 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-4/5 mb-2"></div>
            <div className="flex gap-1 my-2">
              <div className="h-3 w-3 bg-gray-200 rounded"></div>
              <div className="h-3 w-3 bg-gray-200 rounded"></div>
              <div className="h-3 w-3 bg-gray-200 rounded"></div>
              <div className="h-3 w-3 bg-gray-200 rounded"></div>
              <div className="h-3 w-3 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
        
        <div className="h-3 bg-gray-200 rounded w-full my-2"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6 mb-2"></div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
