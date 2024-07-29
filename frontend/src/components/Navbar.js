import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Stil dosyasını import edin, eğer var ise

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add-recipe">Add Recipe</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
