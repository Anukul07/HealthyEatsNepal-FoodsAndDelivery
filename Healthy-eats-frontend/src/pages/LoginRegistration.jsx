import React, { useState } from 'react';
import '../styles/LoginRegistration.css';
import LoginComponent from '../components/LoginComponent';
import RegistrationComponent from '../components/RegistrationComponent';
import ForgotPassword from '../components/ForgotPassword';
import { useNavigate } from 'react-router-dom';

function LoginRegistration() {
  const navigate = useNavigate();
  const [showRegistrationForm, setShowRegistrationFrom] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleButtonClick = () => {
    navigate("/");
  };
  return ( 
    <div className='login-container'>
      <div className='login-page'>
        {!showRegistrationForm && !showForgotPassword && (
          <LoginComponent 
            setShowRegistrationFrom={setShowRegistrationFrom} 
            setShowForgotPassword={setShowForgotPassword}
          />
        )}
        {showRegistrationForm && !showForgotPassword && (
          <RegistrationComponent 
            setShowRegistrationFrom={setShowRegistrationFrom}
          />
        )}
        {!showRegistrationForm && showForgotPassword && (
          <ForgotPassword 
            setShowForgotPassword={setShowForgotPassword}
          />
        )}
        <div className='login-page-right-section'>
          <img className='login-logo'  src="src/assets/login-images/login-logo.png" alt="Login Logo"/>
          <button type='button' className='back-home-button' onClick={handleButtonClick}>
            <i className="fa fa-home"></i>Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginRegistration;
