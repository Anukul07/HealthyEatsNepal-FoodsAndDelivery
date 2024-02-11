import React from 'react'
import '../styles/LoginComponent.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'; 
import RegistrationComponent from './RegistrationComponent'
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
  const navigate = useNavigate();
  const [showRegistrationForm, setShowRegistrationFrom] = useState(false)
  const toggleShowRegistrationForm = () => {
    setShowRegistrationFrom(true);
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
      try {
          const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
          const { accessToken,tokenType } = response.data;
          localStorage.setItem('accessToken', tokenType+accessToken);
          navigate("/");
          
      } catch (error) {
          if (error.response.status === 403) {
              setErrorMessage('Check your email and password and try again.');
          } else {
              setErrorMessage('Login failed. Please try again later.');
          }
      }
  };

  return (
    <>
    {!showRegistrationForm ? (
       <div className='login-form'>
       <div className='login-form-left-section-top-elements'>
         <h1 className='login-top-element-h1'>Welcome</h1>
         <p className='login-top-element-p'>We are glad you are back with us</p>
       </div>
       <div className='login-form-left-section-middle-elements'>
           <label htmlFor="email-field">Email</label>
           <input type="email" name="email" id="email-field" value={email} onChange={(e) => setEmail(e.target.value)}/>
           <label htmlFor="password-field">Password</label>
           <input type="password" name="password" id="password-field" value={password} onChange={(e) => setPassword(e.target.value)}/>
           {errorMessage && <p className='error-message'>{errorMessage}</p>}
       </div>
       <div className='login-form-left-section-bottom-elements'>
           <button type='button' className='login-button' onClick={handleLogin}>Login</button>
           <div><p style={{display:"inline"}} className='login-bottom-element-p'>Are you new here? </p><Link to={"#"} onClick={toggleShowRegistrationForm}>Join us</Link></div>  
           <Link className='forgot-password-link'>Forgot password?</Link>  
       </div>  
   </div>
    ) : (
        <RegistrationComponent/>
    )
    } 
    </>
   
  )
}

export default LoginComponent