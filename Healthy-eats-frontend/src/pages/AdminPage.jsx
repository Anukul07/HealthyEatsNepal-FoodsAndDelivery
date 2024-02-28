import React, { useState, useEffect } from 'react';
import '../styles/AdminPage.css';
import AdminSidebar from '../components/AdminSidebar.jsx';
import AdminDashboard from '../components/AdminDashboard.jsx';
import AdminFood from '../components/AdminFood.jsx';
import AdminUser from '../components/AdminUser.jsx';
import AdminOrder from '../components/AdminOrder.jsx';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function AdminPage() {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state ? location.state.email : ''; 

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleSetActiveComponent = (component) => {
    setActiveComponent(component);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); 
    navigate('/Login'); 
  };

  return (
    <div className='admin-page-container'>
      <div className='admin-page-top'>
        <div className='admin-page-top-left'>
          <img src="src/assets/logo.png" className='admin-page-logo' alt="Company logo"/>
          <h2>ADMIN OF HEALTHY EATS NEPAL</h2>
        </div>
        <div className='admin-page-top-right'>
          <h3>{email}</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className='admin-page-middle'>
        <div className='admin-middle-sidebar'>
          <AdminSidebar activeComponent={activeComponent} setActiveComponent={handleSetActiveComponent} />
        </div>
        <div className='admin-middle-body'>
          {activeComponent === 'dashboard' && <AdminDashboard setActiveComponent={handleSetActiveComponent} />}
          {activeComponent === 'foods' && <AdminFood />}
          {activeComponent === 'users' && <AdminUser />}
          {activeComponent === 'orders' && <AdminOrder />}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
