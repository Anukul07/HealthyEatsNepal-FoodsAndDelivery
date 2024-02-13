import React from 'react'
import { useContext } from 'react';
import CartContext from '../CartContext';

function Cart() {
  const {foods} = useContext(CartContext)
  return (
    <div>
      {foods.map((food) => (
        <div>
           <h2>{food.foodId}</h2>
          <h2>{food.quantity}</h2>
        </div> 
      ))}

    </div>
  )
}

export default Cart