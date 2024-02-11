import React from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/Explore.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

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
              <div className='food-one'>
                <img src={`http://localhost:8080/Images/${food.foodImage}`}/>
                <p>Rs.{food.foodPrice}</p>
                <h3>{food.foodName}</h3>
                <p>{food.foodDescription}</p>
                <span><button>Add to cartt</button><input type="number" min={"1"}/></span>
              </div>
              <div className='food-two'>
              food 2
              </div>
              <div className='food-three'>
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