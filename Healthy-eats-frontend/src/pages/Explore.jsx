import React from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/Explore.css'


function Explore() {
  return (
    <div className='explore-container'>
       <Header/>
        <div className='explore-main-container'>
          <div className='explore-selection'>
                <button>Vegeterian</button>
                <button>Non Vegeterian</button>
          </div>
          <div className='explore-foods'>
              <div className='food-one'>
                food 1
              </div>
              <div className='food-two'>
              food 2
              </div>
              <div className='food-three'>
              food 3
              </div>
              <div className='food-four'>
              food 4
              </div>
              <div className='food-five'>
              food 5
              </div>
              <div className='food-six'>
              food 6
              </div>
              <div className='food-seven'>
              food 7
              </div>
              <div className='food-eight'>
              food 8
              </div>
              <div className='food-nine'>
              food 9
              </div>
          </div>

        </div>
       <Footer/>
    </div>
  )
}

export default Explore