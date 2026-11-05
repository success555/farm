'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, ProductVariant } from './products-data';

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
  effectiveUnitPrice: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('doutare_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('doutare_cart', JSON.stringify(items));
    }
  }, [items, mounted]);

  const computeEffectivePrice = (product: Product, variant: ProductVariant, qty: number): number => {
    // Check wholesale tiers
    if (product.wholesaleTiers && product.wholesaleTiers.length > 0) {
      const matchedTier = [...product.wholesaleTiers]
        .sort((a, b) => b.minQty - a.minQty)
        .find(t => qty >= t.minQty);
      if (matchedTier) {
        return matchedTier.discountedPrice;
      }
    }
    return variant.price;
  };

  const addToCart = (product: Product, variant: ProductVariant, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.variant.id === variant.id);
      if (existingIndex > -1) {
        const newQty = prev[existingIndex].quantity + quantity;
        const newPrice = computeEffectivePrice(product, variant, newQty);
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          effectiveUnitPrice: newPrice,
        };
        return updated;
      } else {
        const effectivePrice = computeEffectivePrice(product, variant, quantity);
        return [...prev, { product, variant, quantity, effectiveUnitPrice: effectivePrice }];
      }
    });
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.variant.id === variantId) {
          const effectivePrice = computeEffectivePrice(item.product, item.variant, quantity);
          return { ...item, quantity, effectiveUnitPrice: effectivePrice };
        }
        return item;
      })
    );
  };

  const removeFromCart = (variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variant.id !== variantId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.effectiveUnitPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

