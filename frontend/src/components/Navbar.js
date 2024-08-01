// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = () => {
      const token = Cookies.get('token');
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

  console.log('Role:', role);

  return (
    <nav className="navbar-container">
      <h4 className='navbar-logo'><Link className='navbar-link-direction' to="/">Recipes For Student</Link></h4>
      <h4 className='navbar-link'><Link className='navbar-link-direction' to="/recipe-list">List of Recipes</Link></h4>
      {(role === 0 || role === 2) && (
        <h4 className='navbar-link'><Link className='navbar-link-direction' to="/add-recipe">Add Recipe</Link></h4>
      )}
      <h4 className='navbar-link'><Link className='navbar-link-direction' to="/login">Login</Link></h4>
      <h4 className='navbar-link'><Link className='navbar-link-direction' to="/register">Register</Link></h4>
    </nav>
  );
};

export default Navbar;
