import React from 'react'
import '../styles/Header.css'
import { Link } from 'react-router-dom';

function Header() {

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
          <Link to="/" className='nav-link'>
            HOMEMEAL BOX
          </Link>
          <Link to="/AboutUs" className='nav-link'>
            ABOUT US
          </Link>
          <Link to="/" className='nav-link'>
            CONTACT
          </Link>
        </div>
        <div className="nav-right-section">
          <button className="cart-button">
            <img src="src/assets/header-images/cart.png" alt="" className="cart-button-img" />
          </button>
          <button className="chat-button">
            <img src="src/assets/header-images/chat.png" alt="" className="chat-button-img" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;