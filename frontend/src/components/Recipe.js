// recipe-app/frontend/src/components/Recipe.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteRecipe } from '../features/recipes/recipesSlice';
import '../styles/recipe.css'; // Stil dosyasını import edin

const Recipe = ({ recipe }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteRecipe(recipe._id));
  };
  return (
    <div className='recipe-section'>
      <h2 className='recipe-title'>{recipe.title}</h2>
      {recipe.image && <img className='recipe-image' src={recipe.image} alt={recipe.title} />}
      <p className='recipe-attributes'><strong>Category:</strong> {recipe.category}</p>
      <p className='recipe-attributes'><strong>Preparation Time:</strong> {recipe.prepTime}</p>
      <p className='recipe-attributes'><strong>Cooking Time:</strong> {recipe.cookTime}</p>
      <p className='recipe-attributes'><strong>Total Time:</strong> {recipe.totalTime}</p>
      <p className='recipe-attributes'><strong>Servings:</strong> {recipe.servings}</p>
      <p className='recipe-attributes'><strong>Ingredients:</strong>{recipe.ingredients}</p>
      <p className='recipe-attributes'><strong>Instructions:</strong>{recipe.instructions}</p>
      {recipe.nutrition ? (
        <>
          <p className='recipe-attributes'><strong>Calories:</strong> {recipe.nutrition.calories}</p>
          <p className='recipe-attributes'><strong>Protein:</strong> {recipe.nutrition.protein}</p>
          <p className='recipe-attributes'><strong>Fat:</strong> {recipe.nutrition.fat}</p>
          <p className='recipe-attributes'><strong>Carbohydrates:</strong> {recipe.nutrition.carbohydrates}</p>
        </>
      ) : (
        <p className='recipe-attributes'>No nutrition information available</p>
      )}
      <p className='recipe-attributes'><strong>Author:</strong>{recipe.author}</p>
      <p className='recipe-attributes'><strong>Date Published:</strong> {new Date(recipe.datePublished).toLocaleDateString()}</p>
      <p className='recipe-attributes'><strong>Notes:</strong>{recipe.notes}</p>
      <p className='recipe-attributes'><strong>Tags:</strong>{recipe.tags}</p>
      <p className='recipe-attributes'><strong>Rating:</strong>{recipe.rating}</p>
      <Link to={`/update-recipe/${recipe._id}`}>
        <button className='recipe-update-button'>Edit</button>
      </Link>
      <button className='recipe-delete-button' onClick={handleDelete}>Delete</button>

    </div>
  );
};

export default Recipe;
