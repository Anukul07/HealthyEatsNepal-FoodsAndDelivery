import React from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { useNavigate } from 'react-router-dom'
import '../styles/Homepage.css'

function Homepage(){
    const navigate = useNavigate();

    const handleExploreButtonClick = () => {
        navigate('/Explore')
    }

    return(
        <div className='body-container'>
            <div className="background-container">
                <Header></Header>
                <div className="middle-section">
                    <div className="middle-section-text">
                        <h2>FOR YOUR WELLBEING</h2>
                        <h1>EAT HEALTHY</h1>
                        <h3>From our chef to your doors</h3>
                        <button onClick={handleExploreButtonClick} className="explore-button">EXPLORE NOW</button>
                    </div>
                </div>
            </div>
            <div className='header-for-card'>
                <h1>Follow these 4 easy steps!</h1>
            </div>
            <div className='body-info-mid'>
                <div className='instruction-card-1'>
                    <div>
                        <img className='card-1-image' src="src/assets/instruction-images/binoculars.png"/>
                    </div>
                    <div>
                        <h2>Explore meals</h2>
                    </div>
                    <div>
                        <p>We have good meals just needed for your healthy lifestyle</p>
                    </div>
                </div>
                <div className='instruction-card-2'>
                    <div>
                     <img className='card-2-image' src="src/assets/instruction-images/calendar.png"/>
                    </div>
                    <div>
                        <h2>Delivery dates</h2>
                    </div>
                    <div>
                        <p>Choose from our varieties of meal and we will deliver it to you at your meal time</p>
                    </div>
                </div>
                <div className='instruction-card-3'>
                    <div>
                     <img className='card-3-image' src="src/assets/instruction-images/add-to-basket.png"/>
                    </div>
                    <div>
                        <h2>Cart and Payment</h2>
                    </div>
                    <div>
                        <p>Add to cart and pay and then your order is confirmed</p>
                    </div>
                </div>
                <div className='instruction-card-4'>
                    <div>
                         <img className='card-4-image' src="src/assets/instruction-images/delivery.png"/>
                    </div>
                    <div>
                        <h2>Delivery</h2>
                    </div>
                    <div>
                        <p>Food is ready! Comes to your door asap!</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default Homepage