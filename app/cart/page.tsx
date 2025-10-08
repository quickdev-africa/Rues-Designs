"use client";
import React from "react";
import CartIcon from "../../components/ui/CartIcon";
import { useCart } from "../../components/ui/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, rentalDays, setRentalDays } = useCart();
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  // Calculate rental days
  function getRentalDays() {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    if (isNaN(start) || isNaN(end) || end < start) return 1;
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, diffDays);
  }

  React.useEffect(() => {
    const days = getRentalDays();
    setRentalDays(days);
  }, [startDate, endDate]);
  const proratedTotal = items.reduce((sum, item) => sum + item.price * item.quantity * rentalDays, 0);
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <CartIcon />
      <div className="mt-6">
        {items.length === 0 ? (
          <div>Cart is empty.</div>
        ) : (
          <>
            <div className="mb-6">
              <div className="font-semibold mb-2">Select Rental Duration</div>
              <div className="flex gap-4">
                <div>
                  <label className="block text-sm mb-1">From</label>
                  <input type="date" className="input input-bordered" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm mb-1">To</label>
                  <input type="date" className="input input-bordered" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
                <div className="flex items-end">
                  <span className="ml-4 text-sm font-medium">{rentalDays} day{rentalDays > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded object-cover" />
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
                </div>
              ))}
              <div className="flex justify-between items-center mt-6">
                <div className="font-bold text-lg">Total: <span className="text-[#D4AF36]">${proratedTotal}</span></div>
                <button className="text-sm underline" onClick={clearCart}>Clear Cart</button>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Checkout button */}
      {items.length > 0 ? (
        <a href="/checkout?step=select" className="mt-8 block w-full bg-[#D4AF36] text-white py-3 rounded font-semibold text-lg text-center">Proceed to Checkout</a>
      ) : (
        <a href="/shop" className="mt-8 block w-full bg-[#D4AF36] text-white py-3 rounded font-semibold text-lg text-center">Proceed to Shop</a>
      )}
    </div>
  );
}
