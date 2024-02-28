import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ForgotPassword.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/auth/send-otp/${email}`);
      if (response.data.message === 'success') {
        setSuccessMessage('An OTP has been sent to your email.');
        setShowOtpField(true);
      } else {
        setErrorMessage('Email address does not exist.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };
  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/auth/validate-otp/${email}/${otp}`);
      if (response.data.message === 'success') {
        setSuccessMessage('OTP validated successfully.');
        setShowOtpField(false);
        setShowPasswordFields(true);
      } else {
        setErrorMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/auth/password-reset/${password}/${email}`);
      if (response.data === 'success') {
        setSuccessMessage('Password reset successful. Redirecting to login page...');
        setTimeout(() => {
          window.location.href = '/Login';
        }, 2000);
      } else {
        setErrorMessage('An error occurred while resetting the password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setErrorMessage('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleRetypePasswordChange = (e) => {
    setRetypePassword(e.target.value);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    if (!validatePassword(password)) {
      setErrorMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one symbol.');
      return false;
    }
    if (password !== retypePassword) {
      setErrorMessage('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleResetPassword();
    }
  };
  return (
    <div className='forgot-password-container'>
      <div className='forgot-password-topsection'>
        <h1>Password Reset</h1>
      </div>
      <div className='forgot-password-middlesection'>
      {!showOtpField && !showPasswordFields && (
        <div className='forgot-password-email'>
          <div className='forgot-password-email-field'>
            <label htmlFor="email-field">Please enter your email</label>
            <input type="email" name="email" id="email-field" value={email} onChange={handleEmailChange}/>
          </div>
          <div className='forgot-password-email-button'>
            <button className='password-reset-buttons' onClick={handleVerifyEmail}>Verify email</button>
          </div>
        </div>
      )}
      {showOtpField && !showPasswordFields && (
        <div className='forgot-password-otp'>
          <div className='forgot-password-otp-field'>
            <label htmlFor="otp-field">Enter the OTP sent to your email</label>
            <input type="text" name="otp" id="otp-field" value={otp} onChange={handleOtpChange}/>
          </div>
          <div className='forgot-password-otp-button'>
            <button className='password-reset-buttons' onClick={handleVerifyOtp}>Verify OTP</button>
          </div>
        </div>
      )}
      {showPasswordFields && (
        <div className='forgot-password-password'>
          <div className='forgot-password-password-field'>
            <label htmlFor="password-field">Enter new password</label>
            <input type="password" name="password" id="password-field" value={password} onChange={handlePasswordChange}/>
          </div>
          <div className='forgot-password-retypepassword-field'>
            <label htmlFor="retype-password-field">Retype new password</label>
            <input type="password" name="retype-password" id="retype-password-field" value={retypePassword} onChange={handleRetypePasswordChange}/>
          </div>
          <div className='forgot-password-password-button'>
            <button onClick={handleSubmit} className='password-reset-buttons'>Reset Password</button>
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p>{successMessage}</p>}
        </div>
      )}
      </div>
      <div className='forgot-password-bottomsection'>
          <button><FontAwesomeIcon icon={faCircleChevronLeft} size="sm" style={{color: "#000000",}} /> Back to login</button>
      </div>
    </div>
  );
}

export default ForgotPassword;
