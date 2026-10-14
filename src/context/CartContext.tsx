import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, BottleVariant, PerfumeProduct } from '../types';

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: PerfumeProduct, variant: BottleVariant, quantity?: number, engraving?: string) => void;
  removeFromCart: (productId: string, variantSize: string) => void;
  updateQuantity: (productId: string, variantSize: string, delta: number) => void;
  clearCart: () => void;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 120;
const STANDARD_SHIPPING_FEE = 15;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aurais_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aurais_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('aurais_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('aurais_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const addToCart = (product: PerfumeProduct, variant: BottleVariant, quantity = 1, engraving?: string) => {
    setItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedVariant.size === variant.size
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }

      return [
        ...prev,
        {
          product,
          selectedVariant: variant,
          quantity,
          includeComplimentarySample: variant.volumeMl >= 30, // complimentary matching 2ml with 30ml+ flacons
          engravingText: engraving
        }
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantSize: string) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.selectedVariant.size === variantSize)));
  };

  const updateQuantity = (productId: string, variantSize: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.product.id === productId && i.selectedVariant.size === variantSize) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'AURAIS15') {
      setAppliedPromo('AURAIS15');
      return { success: true, message: 'VIP code applied: 15% luxury discount' };
    }
    if (clean === 'WELCOME10') {
      setAppliedPromo('WELCOME10');
      return { success: true, message: 'Welcome code applied: 10% off your first flacon' };
    }
    if (clean === 'FREESHIP') {
      setAppliedPromo('FREESHIP');
      return { success: true, message: 'Complimentary white-glove courier activated' };
    }
    return { success: false, message: 'Invalid or expired concierge promotion code' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const subtotal = items.reduce((acc, i) => acc + i.selectedVariant.price * i.quantity, 0);

  let discount = 0;
  if (appliedPromo === 'AURAIS15') {
    discount = subtotal * 0.15;
  } else if (appliedPromo === 'WELCOME10') {
    discount = subtotal * 0.10;
  }

  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD || appliedPromo === 'FREESHIP'
      ? 0
      : STANDARD_SHIPPING_FEE;

  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = taxableAmount * 0.08;
  const total = taxableAmount + shipping + tax;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        subtotal,
        discount,
        shipping,
        tax,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingProgress,
        wishlist,
        toggleWishlist,
        isInWishlist
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
