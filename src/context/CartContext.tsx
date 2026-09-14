import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { pushRemoveFromCart, parseNumericPrice } from "../lib/gtm";

export type CartItem = {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
  ref?: string;
  size?: string;
  height?: string;
  heightUnit?: string;
  variantId?: string;
};

type CartContextValue = {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  isInCart: (id: string) => boolean;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

import { useUser } from "./UserContext";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const storageKey = user?.email ? `selhaya_cart_${user.email}` : "selhaya_cart_guest";

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from storage when storageKey changes (e.g., login/logout)
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(storageKey);
        let parsedSaved: CartItem[] = [];
        if (saved) {
          parsedSaved = JSON.parse(saved);
        }

        // Merge guest cart into user cart if we are loading a user cart
        if (user?.email && storageKey === `selhaya_cart_${user.email}`) {
          const guestSaved = localStorage.getItem("selhaya_cart_guest");
          if (guestSaved) {
            const guestCart: CartItem[] = JSON.parse(guestSaved);
            if (guestCart.length > 0) {
              guestCart.forEach((guestItem) => {
                const existing = parsedSaved.find((item) => item.id === guestItem.id);
                if (existing) {
                  existing.quantity += guestItem.quantity;
                } else {
                  parsedSaved.push(guestItem);
                }
              });
              // Clear guest cart after successful merge
              localStorage.removeItem("selhaya_cart_guest");
            }
          }
        }

        setCartItems(parsedSaved);
      } catch (e) {
        console.error("Failed to parse cart from local storage", e);
        setCartItems([]);
      }
      setIsInitialized(true);
    }
  }, [storageKey, user?.email]);

  // Save cart to storage whenever it changes (after initialization)
  useEffect(() => {
    if (typeof window !== "undefined" && isInitialized) {
      localStorage.setItem(storageKey, JSON.stringify(cartItems));
    }
  }, [cartItems, storageKey, isInitialized]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => {
      const removed = prev.find((cartItem) => cartItem.id === id);
      if (removed) {
        pushRemoveFromCart({
          item_id: removed.id,
          item_name: removed.name,
          price: parseNumericPrice(removed.price),
          currency: "GBP",
          quantity: removed.quantity,
        });
      }
      return prev.filter((cartItem) => cartItem.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const isInCart = (id: string) => cartItems.some((item) => item.id === id);

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, addToCart, removeFromCart, updateQuantity, isInCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
