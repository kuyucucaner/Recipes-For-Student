import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateRecipe } from '../features/recipes/recipesSlice';
import '../styles/update-recipe-form.css'; // Stil dosyasını import edin

const UpdateRecipeForm = ({ recipe }) => {
  const [title, setTitle] = useState(recipe.title);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [category, setCategory] = useState(recipe.category);
  const [prepTime, setPrepTime] = useState(recipe.prepTime);
  const [cookTime, setCookTime] = useState(recipe.cookTime);
  const [totalTime, setTotalTime] = useState(recipe.totalTime);
  const [servings, setServings] = useState(recipe.servings);
  const [nutrition, setNutrition] = useState({
    calories: recipe.nutrition.calories || '',
    protein: recipe.nutrition.protein || '',
    fat: recipe.nutrition.fat || '',
    carbohydrates: recipe.nutrition.carbohydrates || '',
  });
  const [author, setAuthor] = useState(recipe.author);
  const [datePublished, setDatePublished] = useState(recipe.datePublished);
  const [image, setImage] = useState(recipe.image);
  const [notes, setNotes] = useState(recipe.notes);
  const [tags, setTags] = useState(recipe.tags);
  const [rating, setRating] = useState(recipe.rating);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRecipe = {
      ...recipe,
      title,
      ingredients,
      instructions,
      category,
      prepTime,
      cookTime,
      totalTime,
      servings,
      nutrition,
      author,
      datePublished,
      image,
      notes,
      tags,
      rating
    };
    dispatch(updateRecipe({ id: recipe._id, updatedRecipe }));
  };

  const handleNutritionChange = (e) => {
    const { name, value } = e.target;
    setNutrition((prevNutrition) => ({
      ...prevNutrition,
      [name]: value
    }));
  };

  return (
    <form className='update-recipe-form' onSubmit={handleSubmit}>
        <h3 className="update-recipe-title">Update the recipe</h3>

      <input
        type="text"
        placeholder="Title*"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='update-recipe-input'
      />
      <textarea
        placeholder="Ingredients*"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className='update-recipe-textarea'

      />
      <textarea
        placeholder="Instructions*"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
                className='update-recipe-textarea'
      />
      <input
        type="text"
        placeholder="Category*"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className='update-recipe-input'

      />
      <input
        type="text"
        placeholder="Prep Time*"
        value={prepTime}
        onChange={(e) => setPrepTime(e.target.value)}
        className='update-recipe-input'

      />
      <input
        type="text"
        placeholder="Cook Time*"
        value={cookTime}
        onChange={(e) => setCookTime(e.target.value)}
        className='update-recipe-input'

      />
      <input
        type="text"
        placeholder="Total Time*"
        value={totalTime}
        className='update-recipe-input'

        onChange={(e) => setTotalTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="Servings*"
        value={servings}
        onChange={(e) => setServings(e.target.value)}
        className='update-recipe-input'

      />
      <div className='update-recipe-nutrition'>
        <h3 className="update-recipe-title">Nutrition</h3>
        <input
          type="number"
          name="calories"
          placeholder="Calories*"
          value={nutrition.calories}
          onChange={handleNutritionChange}
          className='update-recipe-input'

        />
        <input
          type="number"
          name="protein"
          placeholder="Protein (g)*"
          value={nutrition.protein}
          className='update-recipe-input'

          onChange={handleNutritionChange}
        />
        <input
          type="number"
          name="fat"
          placeholder="Fat (g)*"
          value={nutrition.fat}
          onChange={handleNutritionChange}
          className='update-recipe-input'

        />
        <input
          type="number"
          name="carbohydrates"
          placeholder="Carbohydrates (g)*"
          value={nutrition.carbohydrates}
          className='update-recipe-input'

          onChange={handleNutritionChange}
        />
      </div>
      <input
        type="text"
        placeholder="Author*"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className='update-recipe-input'

      />
      <input
        type="date"
        placeholder="Date Published*"
        value={datePublished}
        className='update-recipe-input'

        onChange={(e) => setDatePublished(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL*"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className='update-recipe-input'

      />
      <textarea
        placeholder="Notes*"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
             className='update-recipe-textarea'

      />
      <input
        type="text"
        placeholder="Tags*"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className='update-recipe-input'

      />
      <input
        type="number"
        placeholder="Rating*"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className='update-recipe-input'

      />
      <button className='update-recipe-button'type="submit">Update Recipe</button>
    </form>
  );
};

export default UpdateRecipeForm;
