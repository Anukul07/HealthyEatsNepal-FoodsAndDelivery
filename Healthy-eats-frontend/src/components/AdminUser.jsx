import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/AdminUser.css'

function AdminUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/auth/get-all-users')
      .then(response => {
        setUsers(response.data); 
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div className='admin-user-container'>
      {users.map(user => (
        <div key={user.userId} className='admin-user-card'>
          <div className='admin-user-card-id'>
            <h3>User Id</h3>
            <h3>{user.userId}</h3>
          </div>
          <div className='admin-user-card-firstname'>
            <h3>First name</h3>
            <h3>{user.firstName}</h3>
          </div>
          <div className='admin-user-card-lastname'>
            <h3>Last name</h3>
            <h3>{user.lastName}</h3>
          </div>
          <div className='admin-user-card-email'>
            <h3>Email</h3>
            <h3>{user.email}</h3>
          </div>
          <div className='admin-user-card-number'>
            <h3>Contact Number</h3>
            <h3>{user.phoneNumber}</h3>
          </div>
          <div className='admin-user-card-delete'>
            <button><FontAwesomeIcon icon={faTrash} size='2xl' style={{ color: "#000000" }} /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminUser;
