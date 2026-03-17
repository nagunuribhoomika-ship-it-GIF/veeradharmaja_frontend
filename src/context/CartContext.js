import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("eventCart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("eventCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    if (cart.find((i) => i.id === item.id)) return;
    setCart([...cart, item]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((i) => i.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};