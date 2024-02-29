import React, { useState } from 'react';
import '../styles/LoginComponent.css';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import RegistrationComponent from './RegistrationComponent';
import ForgotPassword from './ForgotPassword';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
  const navigate = useNavigate();
  const [showRegistrationForm, setShowRegistrationFrom] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const toggleShowRegistrationForm = () => {
    setShowRegistrationFrom(!showRegistrationForm); 
  };

  const toggleShowForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword); 
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      const { accessToken, tokenType } = response.data;
      localStorage.setItem('accessToken', tokenType + accessToken);
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };
      const roleResponse = await axios.get(`http://localhost:8080/api/auth/getRole/${email}`,config);
      const role = roleResponse.data;
      if (role === 'USER') {
        navigate('/');
      } else if (role === 'ADMIN') {
        navigate('/AdminPage', { state: { email } });
      }          
    } catch (error) {
      setErrorMessage('Check your email and password and try again.');
    }
    console.log(localStorage.getItem('accessToken'))
  };
  return (
    <>
      {!showRegistrationForm && !showForgotPassword ? (
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
            <div>
              <p style={{display:"inline"}} className='login-bottom-element-p'>Are you new here? </p>
              <Link to={"#"} onClick={toggleShowRegistrationForm}>Join us</Link>
            </div>  
            <Link className='forgot-password-link' to="#" onClick={toggleShowForgotPassword}>Forgot password?</Link>  
          </div> 
        </div>
      ) : showRegistrationForm ? (
        <RegistrationComponent/>
      ) : (
        <ForgotPassword setShowForgotPassword={setShowForgotPassword} />
      )}
    </>
  )
}

export default LoginComponent;
