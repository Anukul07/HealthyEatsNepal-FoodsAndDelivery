import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';

function AdminDashboard({ setActiveComponent }) {
  const [usersCount, setUsersCount] = useState(0);
  const [foodsCount, setFoodsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    fetchData();
  }, [setActiveComponent]); 

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Unauthorized');
      }
      const responses = await Promise.all([
        axios.get('http://localhost:8080/api/auth/count-rows' ,{
          headers: {
            Authorization: accessToken
          }
        }),
        axios.get('http://localhost:8080/api/food/count-rows', {
          headers: {
            Authorization: accessToken
          }
        }),
        axios.get('http://localhost:8080/api/order/count-rows', {
          headers: {
            Authorization: accessToken
          }
        }),
      ]);
      setUsersCount(responses[0].data);
      setFoodsCount(responses[1].data);
      setOrdersCount(responses[2].data);
    } catch (error) {
      setUnauthorized(true);
    }
  };

  if (unauthorized) {
    return (
      <div>
        <h3>You must be logged in as admin.</h3>
      </div>
    );
  }
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
