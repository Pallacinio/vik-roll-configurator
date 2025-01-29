import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartItems(cart);
  };

  const addToCart = (newProduct) => {
    setCartItems((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) =>
          item.name === newProduct.name &&
          item.imageLink === newProduct.imageLink &&
          item.width === newProduct.width &&
          item.height === newProduct.height &&
          item.selectedListwa?.name === newProduct.selectedListwa?.name &&
          item.selectedMocowanie?.name === newProduct.selectedMocowanie?.name
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += newProduct.quantity;
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      } else {
        const updatedCart = [...prevCart, newProduct];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  useEffect(() => {
    saveCart(cartItems); 
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);