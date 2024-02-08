import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import AboutUs from './pages/AboutUs.jsx'
import LoginRegistration from './pages/LoginRegistration.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage/>
  },
  {
    path : '/AboutUs',
    element: <AboutUs/>
  },
  {
    path : '/Login',
    element : <LoginRegistration/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router = {router}/>
  </React.StrictMode>,
)
