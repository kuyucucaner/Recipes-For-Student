const PostModel = require('../models/post-model');

const shareRecipe = async (req, res) => {
  try {
      const { recipe, caption } = req.body;

      if (!recipe || !caption) {
          return res.status(400).json({ error: 'Recipe ID and caption are required.' });
      }

      const newPost = new PostModel({
          user: req.user.id,
          recipe: recipe,  // Use 'recipe' to match the request body
          caption: caption,
      });

      await newPost.save();

      res.status(201).json(newPost);
  } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Tarif paylaşımı sırasında bir hata oluştu.' });
  }
};
const getRecipePost = async (req, res) => {
  try {
    const recipe = await PostModel.find();
    res.status(200).json(recipe);
  }
  catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Beğittiğiniz resepsiyonların paylaşımları getirilemedi.' });
  }
};

  
  module.exports = { shareRecipe , getRecipePost};
  