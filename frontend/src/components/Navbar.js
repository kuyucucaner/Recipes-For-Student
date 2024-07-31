import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; // Stil dosyasını import edin

const Navbar = () => {
  return (
    <nav className="navbar-container">
        <h4 className='navbar-logo' ><Link className='navbar-link-direction' to="/">Recipes For Student</Link></h4>
        <h4 className='navbar-link' ><Link className='navbar-link-direction' to="/recipe-list">List of Recipes</Link></h4>
        <h4 className='navbar-link' ><Link className='navbar-link-direction' to="/add-recipe">Add Recipe</Link></h4>
        <h4 className='navbar-link' ><Link className='navbar-link-direction' to="/login">Login</Link></h4>
        <h4 className='navbar-link' ><Link className='navbar-link-direction' to="/register">Register</Link></h4>
    </nav>
  );
};

export default Navbar;
