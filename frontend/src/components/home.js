import React from "react";
import "../styles/home.css"; // Stil dosyasını import edin
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Recipe Page!</h1>
      <h2 className="home-subtitle">Discover Delicious Recipes</h2>
      <h4 className="home-text">
      Find your favorite recipes and create wonders in the kitchen!
      </h4>
      <Link to='/recipe-list' className="home-button">Find Recipes!</Link>
    </div>
  );
};

export default Home;
