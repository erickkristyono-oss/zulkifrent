import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'zulkifrent_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem(item) {
    // item: { vehicle_id, name, price_per_day, image_url, category_name, start_date, end_date, quantity }
    setItems((prev) => [...prev, { ...item, cart_id: Date.now() + Math.random() }]);
  }

  function removeItem(cart_id) {
    setItems((prev) => prev.filter((it) => it.cart_id !== cart_id));
  }

  function clearCart() {
    setItems([]);
  }

  function calcDays(start_date, end_date) {
    const days = Math.ceil((new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, days);
  }

  const total = items.reduce(
    (sum, it) => sum + it.price_per_day * (it.quantity || 1) * calcDays(it.start_date, it.end_date),
    0
  );

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total, calcDays }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
