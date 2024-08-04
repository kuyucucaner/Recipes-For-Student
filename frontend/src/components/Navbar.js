// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import toastr from 'toastr';

const Navbar = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserRole = () => {
      const token = Cookies.get('accessToken');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setRole(decoded.role);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = () => {
    toastr.success('Logout successful!', 'Success');
    setTimeout(() => {
      Cookies.remove('accessToken'); // Remove token from cookies
      Cookies.remove('refreshToken'); // Remove token from cookies
      setRole(null); // Clear role from state
      navigate('/');  // Redirect to the desired route
      window.location.reload(); // Reload the page
    }, 1000); // 2 seconds delay
  };

  return (
    <nav className="navbar-container">
      <div className='navbar-left-section'>
      <h4 className='navbar-logo'><Link className='navbar-link-direction' to="/">Recipes For Student</Link></h4>
      </div>
      <div className='navbar-right-section'>
      <h4 className='navbar-link'><Link className='navbar-link-direction' to="/recipe-list">List of Recipes</Link></h4>
      {(role === 0 || role === 2 || role === 1) && (
        <h4 className='navbar-link'><Link className='navbar-link-direction' to="/profile">profile</Link></h4>
      )} 
      {(role === 0 || role === 2) && (
        <h4 className='navbar-link'><Link className='navbar-link-direction' to="/add-recipe">Add Recipe</Link></h4>
      )}
       {role !== null ? (
        <button className='navbar-button' onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <h4 className='navbar-link'><Link className='navbar-link-direction' to="/login">Login</Link></h4>
          <h4 className='navbar-link'><Link className='navbar-link-direction' to="/register">Register</Link></h4>
        </>
      )}
      </div>
    </nav>
  );
};

export default Navbar;
