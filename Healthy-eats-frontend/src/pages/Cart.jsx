import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import CartContext from '../CartContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

function Cart() {
  const { foods, updateFoodQuantity, removeFromCart}  = useContext(CartContext); 
  const [foodDetails, setFoodDetails] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (foods.length > 0) {
      const foodIds = foods.map(food => food.foodId).join(',');
      axios.get(`http://localhost:8080/api/food/get-food-image/${foodIds}`)
        .then(response => {
          setFoodDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching food images:', error);
        });
    }
  }, [foods]);

  const handleBackButtonChange = () => {
    navigate('/Explore')
  }
  const handleQuantityChange = (foodId, quantityChange) => {
    const currentQuantity = foods.find(food => food.foodId === foodId)?.quantity || 0;
    const newQuantity = Math.max(1, Math.min(currentQuantity + quantityChange, 10));
    updateFoodQuantity(foodId, newQuantity);
  };
  const handleInputChange = (event, foodId) => {
    const newQuantity = Math.max(1, Math.min(parseInt(event.target.value), 10));
    updateFoodQuantity(foodId, newQuantity);
  };
  const handleDeleteFood = (foodId) => {
    removeFromCart(foodId);  
    setFoodDetails((prevFoodDetails) => prevFoodDetails.filter((food) => food.foodId !== foodId));
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [deliveryTime, setDeliveryTime] = useState('');


  const handleDeliveryTimeChange = (event) => {
    setDeliveryTime(event.target.value);
  };
  const [deliveryType, setDeliveryType] = useState('');

  const handDeliveryTypeChange = (event) => {
    setDeliveryType(event.target.value);
  };

  const getPrice = (food, quantity) => {
    return food.foodPrice * quantity;
  }
  const subtotal = foodDetails.reduce((acc, food) => {
    const quantity = foods.find(f => f.foodId === food.foodId)?.quantity || 0;
    return acc + getPrice(food, quantity);
  }, 0);

const [paymentType, setPaymentType] = useState(null);
const [orderMessage, setOrderMessage] = useState('');

const handlePaymentTypeChange = (type) => {
  setPaymentType(type);
};

const specialRequestRef = useRef();
const deliveryAddressRef = useRef();

const handlePlaceOrder = async () => {
  if (foodDetails.length === 0) {
    setOrderMessage('Your cart is empty');
    return;
  }

  const deliveryDetails = deliveryAddressRef.current.value;
  if (!deliveryDetails) {
    setOrderMessage('Please enter your delivery details');
    return;
  }

  const specialRequestDetail = specialRequestRef.current.value.trim();

  if (!paymentType) {
    setOrderMessage('Please select your payment type');
    return;
  }
  const orderData = {
    orderId: 0,
    userId: userId,
    totalPrice: subtotal,
    orderItems: foods.map(food => ({
      foodId: food.foodId,
      quantity: food.quantity,
      foodName: food.foodName,
      subscriptionWeek: startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : "",
      deliveryTime: deliveryTime,
      deliveryType: deliveryType,
    })),
    specialRequest: specialRequestDetail,
    deliveryAddress: deliveryDetails,
    paymentType: paymentType,
    orderDate: new Date().toISOString(), 
    orderConfirmation: "Confirmed",
    foodReadyConfirmation: "Not Ready"
  };
  console.log(specialRequestDetail)
  console.log(deliveryDetails)

  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.post('http://localhost:8080/api/order/place', orderData, {
      headers: {
        Authorization: accessToken
      }
    });
    if (response.status === 200) {
      setOrderMessage('Order has been placed');
    } else {
      setOrderMessage('You must login to place an order');
    }
  } catch (error) {
    setOrderMessage('You must login to place an order');
  }
};

const fetchUserId = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const response = await axios.get('http://localhost:8080/api/auth/userId', {
        headers: {
          Authorization: accessToken
        }
      });
      setUserId(response.data);
    } else {
      console.log("User not logged in yet")
    }
  } catch (error) {
    console.error('Error fetching userId:', error);
  }
};

useEffect(() => {
  fetchUserId();
}, []);

return (
    <div className='main-cart-container'>
      <div className='back-to-explore'>
        <button onClick={handleBackButtonChange}>Back to explore <FontAwesomeIcon icon={faCircleLeft} style={{color: "#ffffff",}} /></button>
      </div>
      <div className='cart-container'>
        <div className='food-checkout'>
          <div className='food-checkout-header'>
            <h1>Cart</h1>
          </div>
          <div className='food-selection-container'>
          {foodDetails.length === 0 ? (
                      <h3>Your cart is empty.</h3>
                    ) : (
            foodDetails.map(food => (
              <div key={food.foodId} className='food-checkout-items'>
                <div className='food-checkout-selection'>
                  <div className='checkout-image-section'>
                    <img src={`/Images/${food.foodImage}`} style={{height : "70px", width : "90px"}} alt="" />
                  </div>
                  <div className='checkout-food-name'>
                    <p>{food.foodName}</p>
                  </div>
                  <div className='checkout-quantity-section'>
                    <span className='quantity-button'>
                      <button onClick={() => handleQuantityChange(food.foodId, -1)}>-</button>
                      <input type="text" readOnly value={foods.find(f => f.foodId === food.foodId).quantity} onChange={(event) => handleInputChange(event, food.foodId)} />
                      <button onClick={() => handleQuantityChange(food.foodId, 1)}>+</button>
                    </span>
                  </div>
                  <div className='checkout-delivery-week-section'> 
                      <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        startDate={startDate}
                        endDate={endDate}
                        selectsStart
                        minDate={new Date()}
                        maxDate={startDate ? new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000) : null}
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Subscription week start"
                        isClearable
                      />
                      <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        startDate={startDate}
                        endDate={endDate}
                        selectsEnd
                        minDate={startDate}
                        maxDate={startDate ? new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000) : null}
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Subscription week end"
                        isClearable
                      />
                  </div>
                  <div className='checkout-delivery-time-section'>
                      <select value={deliveryTime} onChange={handleDeliveryTimeChange}>
                        <option value="" disabled hidden>Delivery Time</option>
                        <option value="8-11">8:00 am - 11:00 am</option>
                        <option value="13-15">1:00 pm - 3:00 pm</option>
                      </select>
                  </div>
                  <div className='checkout-delivery-type-section'>
                      <select value={deliveryType} onChange={handDeliveryTypeChange}>
                        <option value="" disabled hidden>Delivery Type</option>
                        <option value="alternate">Alternate days</option>
                        <option value="regular">Regular days</option>
                      </select>
                  </div>
                  <div className='checkout-price-section'>
                    <p>Rs {getPrice(food, foods.find(f => f.foodId === food.foodId).quantity)}</p>
                  </div>
                  <div className='checkout-delete-section'>
                    <button className='delete-food' onClick={() => handleDeleteFood(food.foodId)}><FontAwesomeIcon icon={faTrash} size="lg" style={{color: "#777879",}} /></button>
                  </div>
                </div>
              </div>
            ))
            )}
          </div>
          <div className='food-checkout-footer'>
            <h3>Subtotal : Rs {subtotal}</h3>
          </div>
        </div>
        <div className='order-checkout'>
            <div className='order-checkout-heading'>
              <h1>Order details</h1>
            </div>
            <div className='order-checkout-body'>
                  <input type="text" ref={specialRequestRef} class="special-request-input" maxlength="100"  placeholder="Special request: Please provide any special instructions"/>
                  <input type="text" ref={deliveryAddressRef} class="delivery-details-input" maxlength="100" placeholder="Delivery details: Address, contact information, etc."/>
            </div>
            <div className='order-checkout-footer'>
              <span className='checkout-buttons'>
                <button className={`payment-button ${paymentType === 'khalti' ? 'selected' : ''}`} onClick={() => handlePaymentTypeChange('khalti')}>
                <img src="src/assets/button_khalti.png" alt="Khalti"/></button>
                <button className={`payment-button ${paymentType === 'cash-on-delivery' ? 'selected' : ''}`} onClick={() => handlePaymentTypeChange('cash-on-delivery')}>
                <img src="src/assets/cod.png" alt="Cash on Delivery"/>
                </button>
              </span>
                <p>{orderMessage}</p>
                <button className='place-order' onClick={handlePlaceOrder}>Place order</button>
            </div>
            
        </div>
      </div>
    </div>
  )
}
export default Cart;
