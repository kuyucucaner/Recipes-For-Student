// recipe-app/frontend/src/App.js
import React, { Suspense, lazy } from 'react';
import './styles.css';

const RecipeList = lazy(() => import('./components/RecipeList'));
const AddRecipe = lazy(() => import('./components/AddRecipe'));

const App = () => {
  return (
    <div className="App">
      <h1>Recipe App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <AddRecipe />
        <RecipeList />
      </Suspense>
    </div>
  );
};

export default App;
