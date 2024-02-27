import React from 'react'
import '../styles/AdminPage.css'
import AdminSidebar from '../components/AdminSidebar.jsx'
import AdminDashboard from '../components/AdminDashboard.jsx'
import AdminFood from '../components/AdminFood.jsx'
import AdminUser from '../components/AdminUser.jsx'
import AdminOrder from '../components/AdminOrder.jsx'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function AdminPage() {
  const [showAdminDashboard, setShowAdminDashboard] = useState(true);
  const [showAdminFood, setShowAdminFood] = useState(false);
  const [showAdminUser, setShowAdminUser] = useState(false);
  const [showAdminOrder, setShowAdminOrder] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state ? location.state.email : ''; 
  const handleLogout = () => {
    localStorage.removeItem('accessToken'); 
    navigate('/Login'); 
  };
  return (
    <div className='admin-page-container'>
      <div className='admin-page-top'>
        <div className='admin-page-top-left'>
          <img src="src/assets/logo.png" className='admin-page-logo'/>
          <h2>ADMIN OF HEALTHY EATS NEPAL</h2>
        </div>
        <div className='admin-page-top-right'>
          <h3>{email}</h3>
          <button onClick={handleLogout}>logout</button>
        </div>
      </div>
      <div className='admin-page-middle'>
        <div className='admin-middle-sidebar'>
          <AdminSidebar 
            onDashboardClick={() => {
              setShowAdminUser(false);
              setShowAdminFood(false);
              setShowAdminDashboard(true);
              setShowAdminOrder(false);
            }} 
            onFoodsClick={() => {
              setShowAdminUser(false);
              setShowAdminFood(true);
              setShowAdminDashboard(false);
              setShowAdminOrder(false);
            }} 
            onUsersClick={() => {
              setShowAdminUser(true);
              setShowAdminFood(false);
              setShowAdminDashboard(false);
              setShowAdminOrder(false);
            }} 
            onOrdersClick={() => {
              setShowAdminUser(false);
              setShowAdminFood(false);
              setShowAdminDashboard(false);
              setShowAdminOrder(true); 
            }} 
          />
        </div>
        <div className='admin-middle-body'>
          {showAdminDashboard && <AdminDashboard/>}
          {showAdminFood && <AdminFood/>}
          {showAdminUser && <AdminUser/>}
          {showAdminOrder && <AdminOrder/>}
        </div>
      </div>
    </div>
  )
}

export default AdminPage