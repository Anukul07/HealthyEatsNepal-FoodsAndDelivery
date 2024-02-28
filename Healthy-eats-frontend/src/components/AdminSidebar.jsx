import React from 'react';
import '../styles/AdminSidebar.css';

function AdminSidebar({ activeComponent, setActiveComponent }) {
  return (
    <div className='sidebar'>
      <div>
        <button className={`dashboard-sidebar-button ${activeComponent === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveComponent('dashboard')}>Dashboard</button>
      </div>
      <div>
        <button className={`users-sidebar-button ${activeComponent === 'users' ? 'active' : ''}`} onClick={() => setActiveComponent('users')}>Users</button>
      </div>
      <div>
        <button className={`foods-sidebar-button ${activeComponent === 'foods' ? 'active' : ''}`} onClick={() => setActiveComponent('foods')}>Foods</button>
      </div>
      <div>
        <button className={`orders-sidebar-button ${activeComponent === 'orders' ? 'active' : ''}`} onClick={() => setActiveComponent('orders')}>Orders</button>
      </div>
    </div>
  );
}

export default AdminSidebar;
