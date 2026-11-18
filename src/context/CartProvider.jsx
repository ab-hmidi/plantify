import { useEffect, useMemo, useState } from "react";
import { plantList } from "../datas/plantList";
import { CartContext } from "./CartContext";

const CART_STORAGE_KEY = "plantify-cart";
const plantIds = new Set(plantList.map((plant) => plant.id));

function readCart() {
  try {
    const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) return [];

    const parsedCart = JSON.parse(savedCart);
    if (!Array.isArray(parsedCart)) {
      console.warn("Le panier enregistré n’est pas valide.");
      return [];
    }

    return parsedCart.filter(
      (item) =>
        item &&
        plantIds.has(item.id) &&
        Number.isSafeInteger(item.quantity) &&
        item.quantity > 0,
    );
  } catch (error) {
    console.error("Impossible de lire le panier enregistré.", error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Impossible d’enregistrer le panier.", error);
    }
  }, [cart]);

  const value = useMemo(() => {
    const items = cart.flatMap((item) => {
      const plant = plantList.find((product) => product.id === item.id);
      return plant ? [{ ...plant, quantity: item.quantity }] : [];
    });

    return {
      items,
      count: cart.reduce((total, item) => total + item.quantity, 0),
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      addItem: (plantId) => {
        setCart((currentCart) => {
          const existingItem = currentCart.find((item) => item.id === plantId);
          if (existingItem) {
            return currentCart.map((item) =>
              item.id === plantId
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
          }

          return [...currentCart, { id: plantId, quantity: 1 }];
        });
      },
      updateQuantity: (plantId, amount) => {
        setCart((currentCart) =>
          currentCart
            .map((item) =>
              item.id === plantId
                ? { ...item, quantity: item.quantity + amount }
                : item,
            )
            .filter((item) => item.quantity > 0),
        );
      },
    };
  }, [cart, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
