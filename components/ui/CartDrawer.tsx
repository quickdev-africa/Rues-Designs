"use client";
import { useCart } from "./CartContext";
import Link from "next/link";
import { useState } from "react";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, updateQuantity, removeItem, clearCart, rentalDays } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity * rentalDays, 0);

  // Animate drawer closing
  function handleClose() {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      onClose();
    }, 200);
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex ${open ? "" : "pointer-events-none"}`}
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={handleClose}
      />
      {/* Drawer */}
      <aside
        className={`relative w-full max-w-sm bg-white shadow-xl h-full ml-auto flex flex-col transition-transform duration-200 ${open && !isAnimating ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-black text-2xl">×</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              Your cart is empty.<br />
              <Link href="/shop/categories">
                <button className="mt-4 bg-[#D4AF36] text-white py-2 px-4 rounded font-semibold">Go to Shop</button>
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(item => (
                <li key={item.id} className="flex items-center gap-3 border-b pb-3">
                  <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded object-cover" />
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-[#D4AF36] font-bold">${item.price}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                      <span className="px-2">{item.quantity}</span>
                      <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button className="text-red-600 font-bold" onClick={() => removeItem(item.id)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold">Total ({rentalDays} day{rentalDays > 1 ? 's' : ''}):</span>
              <span className="text-[#D4AF36] font-bold text-lg">${total}</span>
            </div>
            <div className="flex gap-2">
              <Link href="/cart" className="flex-1 bg-[#D4AF36] text-white py-2 rounded text-center font-semibold" onClick={handleClose}>View Cart</Link>
            </div>
            <button className="mt-4 w-full text-sm underline text-gray-500" onClick={clearCart}>Clear Cart</button>
          </div>
        )}
      </aside>
    </div>
  );
}
