import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeById } from '../features/recipes/recipes-slice';
import { useParams } from 'react-router-dom';
import '../styles/recipe-detail.css';
import '../styles/recipe.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const recipe = useSelector((state) => state.recipes.recipe);
  const status = useSelector((state) => state.recipes.status);
  const error = useSelector((state) => state.recipes.error);

  useEffect(() => {
    dispatch(fetchRecipeById({ id }));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>No recipe found</div>;
  }

  return (
    <section className='recipe-detail-section'>
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
  </div>
    </section>
  );
};

export default RecipeDetail;
