import React from 'react'
import '../styles/AdminOrder.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTrash, faCalendarCheck} from '@fortawesome/free-solid-svg-icons';

function AdminOrder() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/order/retrieve')
      .then(response => {
        setOrderData(response.data);
      })
      .catch(error => {
        console.error('Error fetching order data:', error);
      });
  }, []);

  const handleReadyButtonClick = async (orderId) => {
    const confirmReady = window.confirm('Is the order ready?');
    if (confirmReady) {
      try {
        await axios.post(`http://localhost:8080/api/order/update-status/Ready/${orderId}`);
        setOrderReady(prevState => ({
          ...prevState,
          [orderId]: true
        }));
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    }
  };

  const handleDeleteButtonClick = async (orderId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (confirmDelete) {
      try {
        await axios.post(`http://localhost:8080/api/order/delete-by-id/${orderId}`);
        setOrderData(prevOrderData => prevOrderData.filter(order => order.orderId !== orderId));
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  return (
    <div className='admin-order-container'>
      {orderData.map(order => (
        <div key={order.orderId} className='admin-order-cards'>
          <div className='admin-order-top'>
            <h3>Order Id: {order.orderId}</h3>
          </div>
          <div className='admin-order-mid'>
            <div className='admin-order-details1'>
              <p>Customer name: {order.customerName} </p>
              <p>Contact number: {order.contactNumber} </p>
              <p>Total price: Rs {order.totalPrice} </p>
            </div>
            {order.orderItems.map((item, index) => (
              <div key={index} className='admin-order-details2'>
                <p>Food name: {item.foodName} </p>
                <p>Quantity: {item.quantity} </p>
                <p>Subs week: {item.subscriptionWeek} </p>
                <p>Delivery time: {item.deliveryTime} </p>
                <p>Delivery type: {item.deliveryType} </p>
              </div>
            ))}
            <div className='admin-order-details3'>
              <p>Order date: {order.orderDate} </p>
              <p>Payment type: {order.paymentType}</p>
            </div>
          </div>
          <div className='admin-order-buttons'>
            {order.foodReadyConfirmation === 'Not Ready' ? (
              <button onClick={() => handleReadyButtonClick(order.orderId)}><FontAwesomeIcon icon={faCalendarCheck} size='lg'/>Ready</button>
            ) : (
              <FontAwesomeIcon icon={faCheckCircle} size='lg' style={{color: "#273fa0"}} />
            )}
            <button onClick={() => handleDeleteButtonClick(order.orderId)}><FontAwesomeIcon icon={faTrash} size='lg' style={{ color: "#000000" }}/>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminOrder