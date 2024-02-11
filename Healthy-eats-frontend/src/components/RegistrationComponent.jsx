import React, { useState } from 'react';
import axios from 'axios'; 
import '../styles/RegistrationComponent.css';
import { Link } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'



function RegistrationComponent() {
    const [showLogin, setShowLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [inputErrors, setInputErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        retypePassword: '',
        phoneNumber: ''
    });
    
    const handleLoginLinkClick = () => {
        setShowLogin(true);
    };

    const handleRegister = async () => {
        const formData = {
            firstName: document.getElementById('firstname-text-field').value,
            lastName: document.getElementById('lastname-text-field').value,
            email: document.getElementById('email-field').value,
            password: document.getElementById('password-field').value,
            retypePassword: document.getElementById('retype-password-text-field').value,
            phoneNumber: document.getElementById('number-text-field').value
        };
        const errors = {};
        if (!formData.firstName) {
            errors.firstName = 'First name is required';
        }
        if (!formData.lastName) {
            errors.lastName = 'Last name is required';
        }
        if (!formData.email) {
            errors.email = 'Email is required';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,13}/.test(formData.password)) {
            errors.password = 'Password must contain at least one uppercase letter, one number, one special character, and be between 8 and 13 characters long';
        }
        if (!formData.retypePassword) {
            errors.retypePassword = 'Please confirm your password';
        } else if (formData.password !== formData.retypePassword) {
            errors.retypePassword = 'Passwords do not match';
        }
        if (!formData.phoneNumber) {
            errors.phoneNumber = 'Contact number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Contact number must contain 10 digits';
        }

        if (Object.keys(errors).length > 0) {
            setInputErrors(errors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', formData);
            console.log('Registration successful:', response.data);
            if(response.data == "User registered success!"){
                setSuccessMessage(" Registration complete! Redirecting to login page");
            }

            document.getElementById('firstname-text-field').value = '';
            document.getElementById('lastname-text-field').value = '';
            document.getElementById('email-field').value = '';
            document.getElementById('password-field').value = '';
            document.getElementById('retype-password-text-field').value = '';
            document.getElementById('number-text-field').value = '';
            setTimeout(() => {
                setShowLogin(true);
            }, 4000);
        } catch (error) {
            console.error('Registration failed:', error.response.data);
            document.getElementById('firstname-text-field').value = '';
            document.getElementById('lastname-text-field').value = '';
            document.getElementById('email-field').value = '';
            document.getElementById('password-field').value = '';
            document.getElementById('retype-password-text-field').value = '';
            document.getElementById('number-text-field').value = '';
            if (error.response.data === 'Email is taken!') {
                setErrorMessage('User with the email address already exists!');
            } else {
                setErrorMessage('Registration failed. Please try again later.');
            }
            setTimeout(() => {
                setErrorMessage('');
            }, 6000);
        }
    };

    return (
        <>
            {!showLogin ? (
                <div className='login-page-left-section'>
                    <div className='left-section-top-elements'>
                        <h1 className='top-element-h1'>Welcome</h1>
                        <p className='top-element-p'>We are glad to have you here</p>
                    </div>
                    <div className='left-section-middle-elements'>
                        {inputErrors.firstName && <span className='error'>{inputErrors.firstName}</span>}
                        <label htmlFor='firstname-text-field'>First name</label>
                        <input type='email' name='firstname' id='firstname-text-field' />

                        {inputErrors.lastName && <span className='error'>{inputErrors.lastName}</span>}
                        <label htmlFor='lastname-text-field'>Last name</label>
                        <input type='email' name='lastname' id='lastname-text-field' />
                       
                        {inputErrors.email && <span className='error'>{inputErrors.email}</span>}
                        <label htmlFor='email-field'>Email</label>
                        <input type='email' name='email' id='email-field' />
                        
                        {inputErrors.password && <span className='error'>{inputErrors.password}</span>}
                        <label htmlFor='password-field'>Password</label>
                        <input type='password' name='password' id='password-field' />
                       
                        {inputErrors.retypePassword && <span className='error'>{inputErrors.retypePassword}</span>}
                        <label htmlFor='retype-password-field'>Retype Password</label>
                        <input type='password' name='retypePassword' id='retype-password-text-field' />
                        
                        {inputErrors.phoneNumber && <span className='error'>{inputErrors.phoneNumber}</span>}
                        <label htmlFor='number-text-field'>Contact number</label>
                        <input type='text' name='number' id='number-text-field' />
                        
                    </div>
                    <div className='left-section-bottom-elements'>
                        <button type='button' className='register-button' onClick={handleRegister}>
                            Register
                        </button>
                        <div>
                            <p style={{ display: 'inline' }} className='buttom-element-p'>
                                Already a member?{' '}
                            </p>
                            <Link to={'#'} className='login-element-link' onClick={handleLoginLinkClick}>
                                log in
                            </Link>
                            {errorMessage && <p className='error-message'>{errorMessage}</p>}
                            {successMessage && <p className='success-message'><FontAwesomeIcon icon={faCheck} bounce style={{color: "#376d38",}}/>{successMessage}</p>}
                        </div>
                    </div>
                </div>
            ) : (
                <LoginComponent />
            )}
        </>
    );
}

export default RegistrationComponent;
