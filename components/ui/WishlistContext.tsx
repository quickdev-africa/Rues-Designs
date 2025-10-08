"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    setItems(stored ? JSON.parse(stored) : []);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('wishlist', JSON.stringify(items));
    }
  }, [items, hydrated]);

  function addItem(item: WishlistItem) {
    setItems(prev => {
      if (prev.find(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function clearWishlist() {
    setItems([]);
  }

  if (!hydrated) return null;
  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
