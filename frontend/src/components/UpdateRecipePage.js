// recipe-app/frontend/src/components/UpdateRecipePage.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UpdateRecipeForm from './UpdateRecipeForm';
import '../styles/update-recipe-page.css'; // Stil dosyasını import edin

const UpdateRecipePage = () => {
  const { id } = useParams();
  const recipe = useSelector((state) =>
    state.recipes.recipes.find((recipe) => recipe._id === id)
  );

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className='update-recipe-container'>
      <UpdateRecipeForm recipe={recipe} />
    </div>
  );
};

export default UpdateRecipePage;
