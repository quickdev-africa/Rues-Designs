"use client";
import { HiHeart } from 'react-icons/hi';
import { useWishlist } from './WishlistContext';

export default function WishlistIcon() {
  const { items } = useWishlist();
  const count = items.length;
  return (
    <button
      className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
      aria-label="Wishlist"
      onClick={() => window.location.href = '/wishlist'}
    >
      <HiHeart size={20} className="text-black" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-xs rounded-full px-1.5 py-0.5 font-bold">{count}</span>
      )}
    </button>
  );
}
