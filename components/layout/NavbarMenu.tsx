"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/shop', label: 'Shop' },
  { href: '/collections', label: 'Collections' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function NavbarMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  
  // Check if the current path matches the link
  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname?.startsWith(href)) return true;
    return false;
  };
  
  return (
    <nav aria-label="Main navigation">
      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-8">
        {navLinks.map(link => (
          <Link 
            key={link.href} 
            href={link.href} 
            className={`font-medium transition-colors py-2 relative group ${
              isActive(link.href) 
                ? 'text-[#D4AF37]' 
                : 'text-gray-700 hover:text-[#D4AF37]'
            }`}
          >
            {link.label}
            <span className={`absolute bottom-0 left-0 h-0.5 bg-[#D4AF37] transition-all duration-300 ${
              isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </Link>
        ))}
      </div>
      
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <HiMenu size={28} />
      </button>
      
      {/* Mobile Menu Panel */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end" role="dialog" aria-modal="true">
          <div className="bg-white w-72 h-full shadow-lg flex flex-col">
            {/* Header with close button */}
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-semibold">Menu</span>
              <button
                className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <HiX size={24} />
              </button>
            </div>
            
            {/* Navigation links */}
            <div className="flex-1 overflow-y-auto py-4">
              {navLinks.map(link => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`block px-6 py-3 border-b border-gray-100 last:border-b-0 ${
                    isActive(link.href)
                      ? 'text-[#D4AF37] bg-gray-50'
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            {/* Bottom section for account/login */}
            <div className="border-t border-gray-200 p-4">
              <Link 
                href="/account" 
                className="block w-full py-2 px-4 text-center bg-[#D4AF37] text-white rounded-md hover:bg-[#C09F27]"
                onClick={() => setOpen(false)}
              >
                My Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
