import React from 'react';

const Recipe = ({ recipe }) => {
  return (
    <div>
      <h2>{recipe.title}</h2>
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Preparation Time:</strong> {recipe.prepTime}</p>
      <p><strong>Cooking Time:</strong> {recipe.cookTime}</p>
      <p><strong>Total Time:</strong> {recipe.totalTime}</p>
      <p><strong>Servings:</strong> {recipe.servings}</p>
      <h3>Ingredients</h3>
      <p>{recipe.ingredients}</p>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
      {recipe.nutrition ? (
        <>
          <p><strong>Calories:</strong> {recipe.nutrition.calories}</p>
          <p><strong>Protein:</strong> {recipe.nutrition.protein}</p>
          <p><strong>Fat:</strong> {recipe.nutrition.fat}</p>
          <p><strong>Carbohydrates:</strong> {recipe.nutrition.carbohydrates}</p>
        </>
      ) : (
        <p>No nutrition information available</p>
      )}
      <h3>Author</h3>
      <p>{recipe.author}</p>
      <p><strong>Date Published:</strong> {new Date(recipe.datePublished).toLocaleDateString()}</p>
      {recipe.image && <img src={recipe.image} alt={recipe.title} />}
      <h3>Notes</h3>
      <p>{recipe.notes}</p>
      <h3>Tags</h3>
      <p>{recipe.tags}</p>
      <h3>Rating</h3>
      <p>{recipe.rating}</p>
    </div>
  );
};

export default Recipe;
