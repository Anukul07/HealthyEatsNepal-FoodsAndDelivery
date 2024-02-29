import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/AdminUser.css'
import { useNavigate } from 'react-router-dom';

function AdminUser() {
  const [users, setUsers] = useState([]);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('Unauthorized');
        }
        const response = await axios.get('http://localhost:8080/api/auth/get-all-users', {
          headers: {
            Authorization: accessToken
          }
        });
        setUsers(response.data);
        } catch (error) {
          setUnauthorized(true);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      const accessToken = localStorage.getItem('accessToken');
      axios.post(`http://localhost:8080/api/auth/delete-user/${userId}`, {}, {
        headers: {
          Authorization: accessToken
        }
      })
        .then(response => {
          setUsers(users.filter(user => user.userId !== userId));
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
    }
  };
  if(unauthorized){
    return <h3>You must be logged in as admin.</h3>
  }

  return (
    <div className='admin-user-container'>
      {unauthorized && <h1>You are not the Admin. Redirecting to login page.</h1>}
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
            <button onClick={() => deleteUser(user.userId)}><FontAwesomeIcon icon={faTrash} size='xl' style={{ color: "#000000" }} /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminUser;
