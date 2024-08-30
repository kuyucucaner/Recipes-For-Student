const RecipeModel = require('../models/recipe-model');
const { validationResult } = require('express-validator');
const { getRecipeID } = require('../services/recipe-service');


const RecipeController = {
  //REDİS
  getRecipe: async (req, res) => {
    const { id } = req.params;

    try {
      // Tarifi almak için servis fonksiyonunu çağır
      const { status, data } = await getRecipeID(id);
  
      // Yanıt durumuna göre uygun HTTP yanıtını döndür
      return res.status(status).json(data);
    } catch (error) {
      // Sunucu hatası durumunda yanıt döndür
      console.error('Error retrieving recipe:', error.message);
      return res.status(500).json({ msg: 'Server Error', error: error.message });
    }
  },
  

// WİTHOUT REDİS
  getRecipes: async (req, res) => {
    try {
      const recipes = await RecipeModel.find();
      res.status(200).json(recipes);
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
      res.status(200).json(recipe);
    } catch (error) {
      console.error('Server Error:', error.message); // Log detailed error message
      res.status(500).send('Server Error');
    }
  },
  
  addRecipe: async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        let videoUrl;

        // Eğer video yüklendiyse, video URL'sini belirleyin
        if (req.files && req.files.video) {
          videoUrl = `/uploads/videos/${req.files.video[0].filename}`;
        }
        
        console.log(req.file); // Log file details
        console.log(req.body); // Log other form fi
        const newRecipe = new RecipeModel({ ...req.body  , videoUrl });
        const recipe = await newRecipe.save();
        console.log('Add Recipe : ', newRecipe);
        res.status(201).json(recipe);
      } catch (error) {
        console.error('Server Error:', error.message); // Log detailed error message
        res.status(500).send('Server Error');
      }
    },

  updateRecipe: async (req, res) => {
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
        res.status(201).json(updatedRecipe);
      } catch (error) {
        console.error('Server Error:', error.message); // Log detailed error message
        res.status(500).send('Server Error');
      }
    },

    deleteRecipe: async (req, res) => {
      try {
        const result = await RecipeModel.findByIdAndDelete(req.params.id);
    
        if (!result) {
          return res.status(404).json({ msg: 'Recipe not found' });
        }
    
        res.status(200).json({ msg: 'Recipe removed' }); // Başarı durumunda 200 döndürün
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
  
      res.status(200).json(recipes);
    } catch (error) {
      console.error('Error fetching filtered recipes:', error);
      res.status(500).json({ error: 'Failed to fetch recipes' });
    }
  },

};

module.exports = RecipeController;
