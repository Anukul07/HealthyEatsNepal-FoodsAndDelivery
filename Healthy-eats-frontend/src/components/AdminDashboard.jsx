import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';

function AdminDashboard({ setActiveComponent }) {
  const [usersCount, setUsersCount] = useState(0);
  const [foodsCount, setFoodsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, [setActiveComponent]); 

  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        axios.get('http://localhost:8080/api/auth/count-rows'),
        axios.get('http://localhost:8080/api/food/count-rows'),
        axios.get('http://localhost:8080/api/order/count-rows'),
      ]);
      setUsersCount(responses[0].data);
      setFoodsCount(responses[1].data);
      setOrdersCount(responses[2].data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='admin-dashboard'>
      <button className='admin-dashboard-users-count' onClick={() => setActiveComponent('users')}>
        <h3>Users</h3>
        <p>{usersCount}</p>
        <FontAwesomeIcon icon={faCircleArrowRight} style={{color: "#7ac6ff"}} size='2xl'/>
      </button>
      <button className='admin-dashboard-foods-count' onClick={() => setActiveComponent('foods')}>
        <h3>Foods</h3>
        <p>{foodsCount}</p>
        <FontAwesomeIcon icon={faCircleArrowRight} style={{color: "#7ac6ff"}} size='2xl'/>  
      </button>
      <button className='admin-dashboard-orders-count' onClick={() => setActiveComponent('orders')}>
        <h3>Orders</h3>
        <p>{ordersCount}</p>
        <FontAwesomeIcon icon={faCircleArrowRight} style={{color: "#7ac6ff"}} size='2xl'/>
      </button>
    </div>
  );
}

export default AdminDashboard;
