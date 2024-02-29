import React from 'react'
import '../styles/AdminFood.css'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash , faFloppyDisk,faPlus, faEdit} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useRef } from 'react';

function AdminFood() {
  const [foods, setFoods] = useState([]);
  const fileInputRefs = useRef([]);
  const [unauthorized, setUnauthorized] = useState(false);
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('Unauthorized');
        }
        const response = await axios.get('http://localhost:8080/api/food/get-all-admin', {
          headers: {
            Authorization: accessToken
          }
        });
        setFoods(response.data);
      } catch (error) {
        setUnauthorized(true);
      }
    };
  
    fetchFoods();
  }, []);
  console.log(unauthorized);

  const handleInputChange = (index, field, value) => {
    const updatedFoods = [...foods];
    updatedFoods[index][field] = value;
    setFoods(updatedFoods);
  };

  const handleImageUpload = (index) => {
    fileInputRefs.current[index].click();
  };

  const handleFileInputChange = (index, event) => {
    const file = event.target.files[0];
    const updatedFoods = [...foods];
    updatedFoods[index].foodImage = file;
    setFoods(updatedFoods);
  };
  const handleAddCard = () => {
    const newFoodCard = {
      foodId: foods.length + 1,
      foodName: '',
      foodDescription: '',
      foodPrice: '',
      foodType: '',
      foodImage: null
    };
    setFoods([...foods, newFoodCard]);
  };
  const handleSave = (food) => {
    const requiredFields = ['foodName', 'foodDescription', 'foodPrice', 'foodType', 'foodImage'];
    const isAnyFieldEmpty = requiredFields.some(field => !food[field]);
    if (isAnyFieldEmpty) {
      alert('All fields must be filled.');
      return;
    }
    const confirmed = window.confirm('Are you sure you want to save foods?');
    if (confirmed) {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('Unauthorized: Access token not found.');
        return;
      }
      const formData = new FormData();
      formData.append('foodId', food.foodId);
      formData.append('foodName', food.foodName);
      formData.append('foodDescription', food.foodDescription);
      formData.append('foodPrice', parseInt(String(food.foodPrice).replace(/\s+/g, ''), 10));
      formData.append('foodType', food.foodType);
      formData.append('foodImage', food.foodImage);
      
      axios.post('http://localhost:8080/api/food/save-food', formData, {
        headers: {
          Authorization: accessToken
        }
      })
      .then(response => {
        console.log('Food saved successfully');
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          alert('You are not logged in as admin.');
        } else {
          console.error('Error saving food:', error);
        }
      });
    }
  };
  
  const handleUpdate = (food) => {
    const requiredFields = ['foodName', 'foodDescription', 'foodPrice', 'foodType', 'foodImage'];
    const isAnyFieldEmpty = requiredFields.some(field => !food[field]);
    if (isAnyFieldEmpty) {
      alert('All fields must be filled.');
      return;
    }
    const confirmed = window.confirm('Are you sure you want to update foods?');
    if (confirmed) {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('Unauthorized: Access token not found.');
        return;
      }
  
      const formData = new FormData();
      formData.append('foodId', food.foodId);
      formData.append('foodName', food.foodName);
      formData.append('foodDescription', food.foodDescription);
      formData.append('foodPrice', parseInt(String(food.foodPrice).replace(/\s+/g, ''), 10));
      formData.append('foodType', food.foodType);
      
      if (food.foodImage instanceof File) {
        formData.append('foodImage', food.foodImage);
        axios.post('http://localhost:8080/api/food/update-food-img', formData, {
          headers: {
            Authorization: accessToken
          }
        })
          .then(response => {
            console.log('Food updated successfully');
          })
          .catch(error => {
            alert('You are not logged in as admin.');
          });
      } else {
        axios.post('http://localhost:8080/api/food/update-food', formData, {
          headers: {
            Authorization: accessToken
          }
        })
          .then(response => {
            console.log('Food updated successfully');
          })
          .catch(error => {
            alert('You are not logged in as admin.');
          });
      }
    } else {
      console.log('Changes discarded.');
    }
  };
  const handleDelete = (foodId, index) => {
    const confirmed = window.confirm('Are you sure you want to delete this food?');
    if (confirmed) {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('Unauthorized: Access token not found.');
        return;
      }
  
      if (foodId) {
        axios.post(`http://localhost:8080/api/food/delete-food/${foodId}`, null, {
          headers: {
            Authorization: accessToken
          }
        })
          .then(response => {
            console.log('Food deleted successfully');
            const updatedFoods = [...foods];
            updatedFoods.splice(index, 1);
            setFoods(updatedFoods);
          })
          .catch(error => {
            alert('You are not logged in as admin.');
          });
      } else {
        const updatedFoods = [...foods];
        updatedFoods.splice(index, 1);
        setFoods(updatedFoods);
      }
    }
  };
  
  if (unauthorized) {
    return <h3>You must be logged in as admin.</h3>;
  }
  return (
    <div className='admin-food-container'>
      {foods.map((food, index) => (
        <div key={food.foodId} className='admin-food-card'>
          <div className='admin-food-name'>
            <h3>Food name</h3>
            <input 
              type="text" 
              value={food.foodName} 
              onChange={(e) => handleInputChange(index, 'foodName', e.target.value)} 
            />
          </div>
          <div className='admin-food-image'>
            <h3>Picture</h3>
            <button className='admin-food-image-button' onClick={() => handleImageUpload(index)}>
              <img src={`Images/${food.foodImage}`} alt={food.foodName} id={`admin-food-image-button-${index}`}/>
            </button>
            <input
              type="file"
              ref={el => fileInputRefs.current[index] = el}
              onChange={(e) => handleFileInputChange(index, e)}
              style={{ display: 'none' }}
            />
          </div>
          <div className='admin-food-description'>
            <h3>Description</h3>
            <textarea 
              value={food.foodDescription} 
              onChange={(e) => handleInputChange(index, 'foodDescription', e.target.value)} 
            />
          </div>
          <div className='admin-food-price'>
            <h3>Price</h3>
            <input 
              type="text" 
              value={food.foodPrice} 
              onChange={(e) => handleInputChange(index, 'foodPrice', e.target.value)} 
            />
          </div>
          <div className='admin-food-type'>
            <h3>Type</h3>
            <select 
              value={food.foodType} 
              onChange={(e) => handleInputChange(index, 'foodType', e.target.value)} 
            >
              <option value="Non-vegeterian">Non-veg</option>
              <option value="Vegeterian">Veg</option>
            </select>
          </div>
          <div className='admin-food-buttons'>
             <button onClick={() => handleSave(food)}>
               Save 
               <FontAwesomeIcon icon={faFloppyDisk} size="lg" style={{color: "#000000",}} />
             </button>
             <button onClick={()=> handleUpdate(food)}>
                Update <FontAwesomeIcon icon={faEdit} size="lg" style={{color: "#000000",}} />
             </button>
             <button onClick={() => handleDelete(food.foodId, index)}>
               Delete 
               <FontAwesomeIcon icon={faTrash} size='lg' style={{ color: "#000000" }} />
             </button>
          </div>
        </div>
      ))}
     <div className='admin-food-container-add-button'>
      <button onClick={handleAddCard}>
        <FontAwesomeIcon icon={faPlus} size="2xl" />
      </button>
     </div>
    </div>
  );
      
}

export default AdminFood