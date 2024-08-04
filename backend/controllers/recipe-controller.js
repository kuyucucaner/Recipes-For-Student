const RecipeModel = require('../models/recipe-model');
const { body, validationResult } = require('express-validator');

const RecipeController = {
  getRecipes: async (req, res) => {
    try {
      const recipes = await RecipeModel.find();
      res.json(recipes);
    } catch (error) {
      console.error('Server Error:', error.message); // Log detailed error message
      res.status(500).send('Server Error');
    }
  },
  getRecipeById: async (req, res) => {
    try {
      const { id } = req.params;
      const recipe = await RecipeModel.findById(id);
      if (!recipe) {
        return res.status(404).json({ msg: 'Recipe not found' });
      }
      res.json(recipe);
    } catch (error) {
      console.error('Server Error:', error.message); // Log detailed error message
      res.status(500).send('Server Error');
    }
  },
  addRecipe: [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('ingredients').not().isEmpty().withMessage('Ingredients are required'),
    body('instructions').not().isEmpty().withMessage('Instructions are required'),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const newRecipe = new RecipeModel({ ...req.body });
        const recipe = await newRecipe.save();
        console.log('Add Recipe : ', newRecipe);
        res.json(recipe);
      } catch (error) {
        console.error('Server Error:', error.message); // Log detailed error message
        res.status(500).send('Server Error');
      }
    },
  ],

  updateRecipe: [
    body('title').optional().not().isEmpty().withMessage('Title is required'),
    body('ingredients').optional().not().isEmpty().withMessage('Ingredients are required'),
    body('instructions').optional().not().isEmpty().withMessage('Instructions are required'),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const { id } = req.params;
        const recipe = await RecipeModel.findById(id);

        if (!recipe) {
          return res.status(404).json({ msg: 'Recipe not found' });
        }

        const updatedRecipe = await RecipeModel.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        console.log('Update Recipe : ', updatedRecipe);
        res.json(updatedRecipe);
      } catch (error) {
        console.error('Server Error:', error.message); // Log detailed error message
        res.status(500).send('Server Error');
      }
    },
  ],

  deleteRecipe: async (req, res) => {
    try {
      const result = await RecipeModel.findByIdAndDelete(req.params.id);
  
      if (!result) {
        return res.status(404).json({ msg: 'Recipe not found' });
      }
  
      res.json({ msg: 'Recipe removed' });
    } catch (error) {
      console.error('Server Error:', error.message); // Log detailed error message
      res.status(500).send('Server Error');
    }
  },
  filterRecipes: async (req, res) => {
    try {
      const { search, category, minPrepTime, maxPrepTime, minCookTime, maxCookTime } = req.query;
      console.log('Query Parameters:', { search, category, minPrepTime, maxPrepTime, minCookTime, maxCookTime });
  
      const filter = {};
  
      if (search) {
        filter.title = { $regex: search, $options: 'i' };
      }
      if (category) {
        filter.category = { $regex: category, $options: 'i' }; // Case-insensitive match
      }
      if (minPrepTime && !isNaN(minPrepTime)) {
        filter.prepTime = { ...filter.prepTime, $gte: Number(minPrepTime) };
      }
      if (maxPrepTime && !isNaN(maxPrepTime)) {
        filter.prepTime = { ...filter.prepTime, $lte: Number(maxPrepTime) };
      }
      if (minCookTime && !isNaN(minCookTime)) {
        filter.cookTime = { ...filter.cookTime, $gte: Number(minCookTime) };
      }
      if (maxCookTime && !isNaN(maxCookTime)) {
        filter.cookTime = { ...filter.cookTime, $lte: Number(maxCookTime) };
      }
  
      // Fetch filtered recipes from the database
      const recipes = await RecipeModel.find(filter);
  
      res.json(recipes);
    } catch (error) {
      console.error('Error fetching filtered recipes:', error);
      res.status(500).json({ error: 'Failed to fetch recipes' });
    }
  },

};

module.exports = RecipeController;
