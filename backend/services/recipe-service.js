const RecipeModel = require('../models/recipe-model');
const client = require('../services/redis-client');

// Tarifi Redis cache'inden al
const getCachedRecipe = async (id) => {
  try {
    const data = await client.get(`recipe:${id}`);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Error getting cached recipe:', err);
    throw err;
  }
};

// Tarifi Redis cache'ine ekle
const setCachedRecipe = async (id, recipe) => {
  try {
    await client.setEx(`recipe:${id}`, 3600, JSON.stringify(recipe));
  } catch (err) {
    console.error('Error setting cached recipe:', err);
    throw err;
  }
};

// Tarif ID'sine göre tarifi getir
const getRecipeID = async (id) => {
  if (!id) {
    console.error('Recipe ID is required');
    return { status: 400, data: { msg: 'Recipe ID is required' } };
  }

  try {
    console.log('Fetching recipe from cache...');
    const cachedRecipe = await getCachedRecipe(id);

    if (cachedRecipe) {
      console.log('Recipe found in cache');
      return { status: 200, data: cachedRecipe };
    }

    console.log('Fetching recipe from database...');
    const recipe = await RecipeModel.findById(id);

    if (!recipe) {
      console.log('Recipe not found in database');
      return { status: 404, data: { msg: 'Recipe not found' } };
    }

    console.log('Caching recipe...');
    await setCachedRecipe(id, recipe);

    console.log('Returning recipe');
    return { status: 200, data: recipe };
  } catch (error) {
    console.error('Server Error:', error.message);
    return { status: 500, data: { msg: 'Server Error', error: error.message } };
  }
};

module.exports = { getRecipeID };
