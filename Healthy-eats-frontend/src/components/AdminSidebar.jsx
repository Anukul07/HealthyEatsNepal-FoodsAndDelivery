import React, { useState } from 'react'
import '../styles/AdminSidebar.css'

function AdminSidebar({onDashboardClick, onFoodsClick, onUsersClick, onOrdersClick}) {
    const [activeButton, setActiveButton] = useState('dashboard');
    const handleDashboardClick = () => {
        setActiveButton('dashboard');
        onDashboardClick();
      };
      const handleFoodsClick = () => {
        setActiveButton('foods');
        onFoodsClick();
      };
      const handleUsersClick = () => {
        setActiveButton('users');
        onUsersClick();
      };
      const handleOrdersClick = () => {
        setActiveButton('orders');
        onOrdersClick();
      };
  return (
    <div className='sidebar'>
        <div>
        <button className={`dashboard-sidebar-button ${activeButton === 'dashboard' ? 'active' : ''}`} onClick={handleDashboardClick}>Dashboard</button>
        </div>
        <div>
            <button className={`users-sidebar-button ${activeButton === 'users' ? 'active' : ''}`} onClick={handleUsersClick}>Users</button>
        </div>
        <div>
             <button className={`foods-sidebar-button ${activeButton === 'foods' ? 'active' : ''}`} onClick={handleFoodsClick}>Foods</button>
        </div>
        <div>
            <button className={`orders-sidebar-button ${activeButton === 'orders' ? 'active' : ''}`} onClick={handleOrdersClick}>Orders</button>
        </div>
    </div>
  )
}

export default AdminSidebar