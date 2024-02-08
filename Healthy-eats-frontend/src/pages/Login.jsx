import React from 'react'
import '../styles/Login.css'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='login-container'>
        <div className='login-page'>
            <div className='login-page-left-section'>
                <div className='left-section-top-elements'>
                    <h1 className='top-element-h1'>Welcome</h1>
                    <p className='top-element-p'>We are glad to have you here</p>
                </div>
                <div className='left-section-middle-elements'>
                    <label htmlFor="firstname-text-field">First name</label>
                    <input type="email" name="firstname" id="firstname-text-field"/>

                    <label htmlFor="lastname-text-field">Last name</label>
                    <input type="email" name="lastname" id="lastname-text-field"/>

                    <label htmlFor="email-field">Email</label>
                    <input type="email" name="email" id="email-field"/>

                    <label htmlFor="password-field">Password</label>
                    <input type="password" name="password" id="password-field"/>

                    <label htmlFor="retype-password-field">Retype Password</label>
                    <input type='password' name="password" id="retype-password-text-field"/>

                    <label htmlFor="number-text-field">Contact number</label>
                    <input type='text' name="number" id="number-text-field"/>
                </div>
                <div className='left-section-bottom-elements'>
                    <button type='button'>Register</button>
                    <div><p style={{display:"inline"}}>Already a member? </p><Link to={"/"}>log in</Link></div>
                    <button type='button'>Back to Home</button>     
                    
                </div> 
            </div>
            <div className='login-page-right-section'>

            </div>
        </div>
    </div>
  )
}

export default Login