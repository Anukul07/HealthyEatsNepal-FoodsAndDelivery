import React from 'react'
import '../styles/LoginRegistration.css'
import LoginComponent from '../components/LoginComponent'
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/");
  };
  return ( 
    <div className='login-container'>
        <div className='login-page'>
            <LoginComponent/>
            <div className='login-page-right-section'>
                <img className='login-logo'  src="src/assets/login-images/login-logo.png"/>
                <button type='button' className='back-home-button' onClick={handleButtonClick}><i class="fa fa-home"></i>Back to Home</button>
            </div>
        </div>
    </div>
  )
}

export default Login;


 