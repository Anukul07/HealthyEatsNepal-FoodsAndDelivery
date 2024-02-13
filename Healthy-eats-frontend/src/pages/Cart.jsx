import React from 'react'
import { useContext , useState } from 'react';
import CartContext from '../CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleLeft} from '@fortawesome/free-solid-svg-icons';
import '../styles/Cart.css'

function Cart() {
  const {foods} = useContext(CartContext)
  return (
    <div className='main-cart-container'>
      <div className='back-to-explore'>
        <button>Back to explore <FontAwesomeIcon icon={faCircleLeft} style={{color: "#ffffff",}} /></button>
      </div>
      <div className='cart-container'>
            <div className='food-checkout'>
                <div className='food-checkout-header'>
                  <h1>Cart</h1>
                </div>
                <div className='food-checkout-items'>
                  <div className='food-checkout-selection'>
                    
                  </div>
                </div>
                <div className='food-checkout-footer'>
                  <h3>Subtotal : Rs 130</h3>
                </div>
            </div>
          <div className='order-checkout'>

          </div>
      </div>
     
    </div>
  )
}
export default Cart