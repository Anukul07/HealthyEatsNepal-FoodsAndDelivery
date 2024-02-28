import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import AboutUs from './pages/AboutUs.jsx';
import LoginRegistration from './pages/LoginRegistration.jsx';
import Explore from './pages/Explore.jsx';
import Cart from './pages/Cart.jsx';
import { CartProvider } from './CartContext.jsx'; 
import AdminPage from './pages/AdminPage.jsx';
import AdminSidebar from './components/AdminSidebar.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';

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
    element: <Cart/>
  },
  {
    path : '/AdminPage',
    element:<AdminPage/>
  },
  {
    path : '/AdminSidebar',
    element: <AdminSidebar/>
  },
  {
    path : '/AdminDashboard',
    element : <AdminDashboard/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <CartProvider> 
          <RouterProvider router={router} />
       </CartProvider>
  </React.StrictMode>
);