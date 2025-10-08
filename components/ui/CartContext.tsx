"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

interface CartContextType {
  items: CartItem[];
  rentalDays: number;
  setRentalDays: (days: number) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [rentalDays, setRentalDays] = useState<number>(1);

  // Load from localStorage after mount
  React.useEffect(() => {
    const stored = localStorage.getItem("cart_items");
    if (stored) setItems(JSON.parse(stored));
    const storedDays = localStorage.getItem("cart_rentalDays");
    if (storedDays) setRentalDays(Number(storedDays));
  }, []);

  // Persist items and rentalDays to localStorage
  React.useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(items));
  }, [items]);
  React.useEffect(() => {
    localStorage.setItem("cart_rentalDays", String(rentalDays));
  }, [rentalDays]);

  function addItem(item: CartItem) {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function updateQuantity(id: string, quantity: number) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, rentalDays, setRentalDays, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
