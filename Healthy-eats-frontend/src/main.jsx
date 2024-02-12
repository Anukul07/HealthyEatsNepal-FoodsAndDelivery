import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import AboutUs from './pages/AboutUs.jsx';
import LoginRegistration from './pages/LoginRegistration.jsx';
import Explore from './pages/Explore.jsx';
import Cart from './pages/Cart.jsx';
import { CartProvider } from './CartContext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />
  },
  {
    path: '/AboutUs',
    element: <AboutUs />
  },
  {
    path: '/Login',
    element: <LoginRegistration />
  },
  {
    path: '/Explore',
    element: <Explore />
  },
  {
    path: '/Cart',
    element: <Cart />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
);