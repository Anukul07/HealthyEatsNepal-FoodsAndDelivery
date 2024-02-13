import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUtensils, faDrumstickBite, faCarrot } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/Explore.css';
import CartContext from '../CartContext.jsx';

function Explore() {
    const {addToCart} = useContext(CartContext);
    const [foods, setFoods] = useState([]);
    const [selectedFoodType, setSelectedFoodType] = useState("All");
    useEffect(() => {
      if (selectedFoodType === "All") {
        axios.get('http://localhost:8080/api/food/get-all')
          .then(response => {
            const sortedFoods = response.data.sort((a, b) => a.foodId - b.foodId);
            setFoods(sortedFoods.map(food => ({
              ...food,  
              quantity: 1
            })));
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      } else {  
        axios.get(`http://localhost:8080/api/food/get-all/filter/${selectedFoodType}`)
          .then(response => {
            const sortedFoods = response.data.sort((a, b) => a.foodId - b.foodId);
            setFoods(sortedFoods.map(food => ({
              ...food,
              quantity: 1
            })));
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }
    }, [selectedFoodType]);

    const handleFoodTypeChange = (foodType) => {
      setSelectedFoodType(foodType);
    };
    const handleQuantityChange = (foodId, newQuantity) => {
      newQuantity = Math.max(1, Math.min(10, newQuantity));
      setFoods(prevFoods => prevFoods.map(food => {
        if (food.foodId === foodId) {
          return {
            ...food,
            quantity: newQuantity
          };
        }
        return food;
      }));
      };
      const handleAddToCart = (foodId, quantity) => {
        addToCart(foodId, quantity);
      }
    return (
      <div className='explore-container'>
        <Header/>
        <div className='explore-main-container'>
          <div className='explore-selection'>
            <button className={`foodtype-selection-button ${selectedFoodType === "All" ? 'active' : ''}`} onClick={() => handleFoodTypeChange("All")}><FontAwesomeIcon icon={faUtensils}/> All</button>
            <button className={`foodtype-selection-button ${selectedFoodType === "Vegeterian" ? 'active' : ''}`} onClick={() => handleFoodTypeChange("Vegeterian")}><FontAwesomeIcon icon={faCarrot} style={{ color: "#e24a08" }} /> Vegetarian</button>
            <button className={`foodtype-selection-button ${selectedFoodType === "Non-vegeterian" ? 'active' : ''}`} onClick={() => handleFoodTypeChange("Non-vegeterian")}><FontAwesomeIcon icon={faDrumstickBite} style={{ color: "#c40606" }} /> Non-vegetarian</button>
          </div>
          <div className='explore-foods'>
            {foods.map(food => (
              <div key={food.foodId} className='foods'>
                <img src={`/Images/${food.foodImage}`} alt={food.foodName} />
                <p>Rs.{food.foodPrice}</p>
                <h3>{food.foodName}</h3>
                <p>{food.foodDescription}</p>
                <span>
                  <button onClick={() => handleAddToCart(food.foodId, food.quantity)}><FontAwesomeIcon icon={faCartShopping} size="2xl" style={{ color: "#74C0FC" }} />Add to cart</button>
                  <div className="number-input">
                    <button onClick={() => handleQuantityChange(food.foodId, food.quantity - 1)}>-</button>
                    <input type="text" value={food.quantity} readOnly />
                    <button onClick={() => handleQuantityChange(food.foodId, food.quantity + 1)}>+</button>
                  </div>
                </span>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  export default Explore;
