// recipe-app/frontend/src/App.js
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/styles.css';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';

const RecipeList = lazy(() => import('./components/RecipeList'));
const AddRecipe = lazy(() => import('./components/AddRecipe'));
const UpdateRecipePage = lazy(() => import('./components/UpdateRecipePage'));

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RecipeList />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/update-recipe/:id" element={<UpdateRecipePage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
