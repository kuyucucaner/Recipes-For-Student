const ReviewModel = require('../models/review-model');
const RecipeModel = require('../models/recipe-model');
const UserModel = require('../models/user-model');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Review =  {
    addReview: async function (req, res) {
        const { recipeId } = req.params;
        const { rating, comment } = req.body;
        const { accessToken } = req.cookies;
        console.log("req cookies :", req.cookies);
    
        if (!accessToken) {
          console.warn("Access token missing");
          return res.status(400).json({ message: "No access token provided" });
        }
    
      
        try {
          const recipe = await RecipeModel.findById(recipeId);
          if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
          }
          const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
          const user = await UserModel.findById(decoded.id);
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
    
          const review = await ReviewModel.create({
            user: user._id,
            recipe: recipeId,
            rating,
            comment,
          });
      
          recipe.reviews.push(review._id);
          const totalRating = await recipe.reviews.reduce(async (accPromise, reviewId) => {
            const acc = await accPromise;
            const review = await ReviewModel.findById(reviewId);
            return acc + review.rating;
        }, Promise.resolve(0));

          recipe.averageRating = totalRating / recipe.reviews.length;
          await recipe.save();
      
          return res.status(201).json({ message: 'Review added', review });
        } catch (error) {
          console.error('Error adding review', error);
          return res.status(500).json({ message: 'Server error' });
        }
      },
      getReviewsByRecipeId: async function (req, res) {
        const { recipeId } = req.params;
      
        try {
          const recipe = await RecipeModel.findById(recipeId).populate('reviews');
          if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
          }
      
          return res.status(200).json(recipe.reviews);
        } catch (error) {
          console.error('Error retrieving reviews', error);
          return res.status(500).json({ message: 'Server error' });
        }
      },
      
};
module.exports = Review;
