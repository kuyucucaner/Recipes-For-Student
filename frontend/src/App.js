// recipe-app/frontend/src/App.js
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/styles.css';
import Navbar from './components/navbar';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';

const RecipeList = lazy(() => import('./components/recipe-list'));
const AddRecipe = lazy(() => import('./components/add-recipe'));
const UpdateRecipePage = lazy(() => import('./components/update-recipe-page'));

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />}/>
          <Route path="/recipe-list" element={<RecipeList />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/update-recipe/:id" element={<UpdateRecipePage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
