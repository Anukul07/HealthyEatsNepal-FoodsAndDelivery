import React, { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [foods, setFoods] = useState([]);

  const addToCart = (foodId, quantity) => {
    const existingFoodIndex = foods.findIndex(food => food.foodId === foodId);
    if (existingFoodIndex !== -1) {
      setFoods(prevState => {
        const updatedFoods = [...prevState];
        updatedFoods[existingFoodIndex].quantity += quantity;
        return updatedFoods;
      });
    } else {
      setFoods(prevState => [...prevState, { foodId, quantity }]);
    }
  };
  const updateFoodQuantity = (foodId, newQuantity) => {
    setFoods(prevState => {
      const updatedFoods = [...prevState];
      const foodIndex = updatedFoods.findIndex(food => food.foodId === foodId);
      if (foodIndex !== -1) {
        updatedFoods[foodIndex].quantity = newQuantity;
      }
      return updatedFoods;
    });
  };

  const removeFromCart = (foodId) => {
    setFoods(prevState => {
      const updatedFoods = [...prevState];
      const foodIndex = updatedFoods.findIndex(food => food.foodId === foodId);
      if (foodIndex !== -1) {
        updatedFoods.splice(foodIndex, 1);
      }
      return updatedFoods;
    });
  };

  const cartLength = foods.length;

  return (
    <CartContext.Provider value={{ foods, addToCart, cartLength, updateFoodQuantity, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
