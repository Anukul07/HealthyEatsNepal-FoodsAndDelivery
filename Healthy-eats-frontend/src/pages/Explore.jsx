import React from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/Explore.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'


function Explore() {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/api/food/get-all')
      .then(response => {
        setFoods(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  //for quanitity selection 
  const [value, setValue] = useState(1);
  const decreaseValue = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };
  const increaseValue = () => {
    if (value < 10) {
      setValue(value + 1);
    }
  };


  return (
    <div className='explore-container'>
       <Header/>
        <div className='explore-main-container'>
          <div className='explore-selection'>
                <button>Vegeterian</button>
                <button>Non Vegeterian</button>
          </div>
          {foods.map(food => (
          <div className='explore-foods'>
              <div className='foods'>
                <img src={`/Images/${food.foodImage}`}/>
                <p>Rs.{food.foodPrice}</p>
                <h3>{food.foodName}</h3>
                <p>{food.foodDescription}</p>
                <span><button><FontAwesomeIcon icon={faCartShopping} size="2xl" style={{color: "#74C0FC"}} />Add to cart</button>
                  <div className="number-input">
                      <button onClick={decreaseValue}>-</button>
                      <input type="text" value={value} readOnly />
                      <button onClick={increaseValue}>+</button>
                  </div>
                </span>
              </div>
              <div className='foods'>
              food 2
              </div>
              <div className='foods'>
              food 3
              </div>
          </div>
          ))}
        </div>
       <Footer/>
    </div>
  )
}

export default Explore