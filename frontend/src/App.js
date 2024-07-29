import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/styles.css';

const RecipeList = lazy(() => import('./components/RecipeList'));
const AddRecipe = lazy(() => import('./components/AddRecipe'));

const App = () => {
  return (
    <div className="App">
      <h1>Recipe App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
