"use client";
import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', query);
    setShowMobileSearch(false);
  };
  
  return (
    <>
      {/* Desktop: Only Search Icon */}
      <button
        className="hidden md:inline-flex p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        aria-label="Open search"
        onClick={() => setShowMobileSearch(true)}
      >
        <HiSearch size={22} className="text-black" />
      </button>
      {/* Mobile Search Icon */}
      <button
        className="md:hidden p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        aria-label="Open search"
        onClick={() => setShowMobileSearch(true)}
      >
        <HiSearch size={22} className="text-black" />
      </button>
      {/* Mobile Search Modal */}
      {showMobileSearch && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start pt-16 px-4" onClick={() => setShowMobileSearch(false)}>
          <form 
            className="relative w-full bg-white rounded-lg shadow-lg mx-auto max-w-md overflow-hidden"
            role="search"
            aria-label="Mobile site search"
            onSubmit={handleSubmit}
            onClick={e => e.stopPropagation()}
          >
            <input
              type="search"
              className="w-full pl-10 pr-4 py-2.5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none"
              placeholder="Search products..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
              aria-label="Search"
            />
            <button 
              type="submit" 
              className="absolute left-2 top-1/2 -translate-y-1/2 text-black hover:text-[#D4AF37] focus:outline-none" 
              aria-label="Search"
            >
              <HiSearch size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
