import { useState, useContext,useEffect, createContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(()=>{
    let existingCartItem= localStorage.getItem('cart')
    if(existingCartItem) setCart(JSON.parse(existingCartItem))
},[])
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access auth context
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
