import React from 'react'
import '../styles/LoginComponent.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import RegistrationComponent from './RegistrationComponent'

function LoginComponent() {

  const [showRegistrationForm, setShowRegistrationFrom] = useState(false)
  const toggleShowRegistrationForm = () => {
    setShowRegistrationFrom(true);
  }

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
           <input type="email" name="email" id="email-field"/>
           <label htmlFor="password-field">Password</label>
           <input type="password" name="password" id="password-field"/>
       </div>
       <div className='login-form-left-section-bottom-elements'>
           <button type='button' className='login-button'>Login</button>
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