import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import CartContext from '../CartContext';

function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [usernameFontSize, setUsernameFontSize] = useState('17px');

  const {cartLength} = useContext(CartContext);
  const cartButtonClass = cartLength > 0 ? "cart-button animated" : "cart-button";

  useEffect(() => {
    const fetchUsername = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        try {
          const response = await axios.get('http://localhost:8080/api/auth/username', {
            headers: {
              Authorization: accessToken
            }
          });
          setUsername(response.data);
          setUsernameFontSize('17px');
        } catch (error) {
          console.error('Error fetching username:', error);
        }
      }
    };
    fetchUsername();
  }, []);

  const handleProfileButtonClick = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login');
    }
  };
  const handleCartButtonClick = () => {
    navigate('/Cart')
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUsername('');
    setUsernameFontSize('17px');
    navigate('/');
  };
  return (
    <div className="header">
      <div className="promo-code">
        <p>Get free delivery with code WELCOME</p>
      </div>
      <div className="navigation">
        <div className="nav-left-section">
          <Link to="/" className='nav-link'>
            HOME
          </Link>
          <Link to="/explore" className='nav-link'>
            HOMEMEAL BOX
          </Link>
          <Link to="/aboutUs" className='nav-link'> 
            ABOUT US
          </Link>
        </div>
        <div className="nav-right-section">
          <button className={cartButtonClass} onClick={handleCartButtonClick}>
            <img className="cart-button-img" src="src/assets/header-images/shopping-cart.png" alt="cart"/> Cart <span className={cartLength>0 ? 'cart-length' : ""}>{cartLength > 0 && cartLength}</span>
          </button>
          <button className="profile-button" onClick={handleProfileButtonClick}>
            <img src="src/assets/header-images/user.png" alt="profile" className="profile-button-img" />
            <span style={{ fontSize: usernameFontSize, marginRight: '8%' }}>{username ? username : 'Log in'}</span>
          </button>
          {username && (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
