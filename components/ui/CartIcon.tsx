
"use client";

import { useState } from 'react';
import { useCart } from './CartContext';
import { HiShoppingCart } from 'react-icons/hi';
import CartDrawer from './CartDrawer';

export default function CartIcon() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <button
        className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        aria-label="Cart"
        onClick={() => setDrawerOpen(true)}
      >
        <HiShoppingCart size={20} className="text-black" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-xs rounded-full px-1.5 py-0.5 font-bold">{count}</span>
        )}
      </button>
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
