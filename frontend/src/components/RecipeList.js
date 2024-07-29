// recipe-app/frontend/src/components/RecipeList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../features/recipes/recipesSlice';
import Recipe from './Recipe';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const recipeStatus = useSelector((state) => state.recipes.status);
  const error = useSelector((state) => state.recipes.error);

  useEffect(() => {
    if (recipeStatus === 'idle') {
      dispatch(fetchRecipes());
    }
  }, [recipeStatus, dispatch]);

  if (recipeStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (recipeStatus === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Link to="/add-recipe">Add a new Recipe</Link>
      {recipes.map((recipe) => (
        <Recipe key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
