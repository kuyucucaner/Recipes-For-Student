// backend/controllers/recipeController.js
const RecipeModel = require('../models/recipeModel');
const { body, validationResult } = require('express-validator');

const RecipeController = {
    getRecipes: async function (req, res) {
        try {
            const recipes = await RecipeModel.find();
            console.log('Get Recipes : ' , recipes);
            res.json(recipes);
        } catch (error) {
            res.status(500).send('Server Error');
        }
    },
    
    addRecipe : [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('ingredients').not().isEmpty().withMessage('Ingredients are required'),
        body('instructions').not().isEmpty().withMessage('Instructions are required'),
        async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          try {
            const newRecipe = new RecipeModel(req.body);
            const recipe = await newRecipe.save();
            console.log('Add Recipe : ' , newRecipe);
            res.json(recipe);
          } catch (error) {
            res.status(500).send('Server Error');
          }
        },
    ],
};

module.exports = RecipeController;