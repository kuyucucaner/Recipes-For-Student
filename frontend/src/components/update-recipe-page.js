// recipe-app/frontend/src/components/UpdateRecipePage.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UpdateRecipeForm from './update-recipe-form';
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
    <section className='update-recipe'>
    <div className='update-recipe-container'>
      <UpdateRecipeForm recipe={recipe} />
    </div>
    </section>
  );
};

export default UpdateRecipePage;
