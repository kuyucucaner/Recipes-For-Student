const express = require('express');
const { getPersonalizedRecommendations } = require('../controllers/recommend-controller');
const { protect } = require('../middlewares/protect');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Recommendation
 *   description: Operations related to personalized recipe recommendations
 */

/**
 * @swagger
 * /api/recommend/recommendations:
 *   get:
 *     summary: Retrieve a list of personalized recipe recommendations
 *     tags: [Recommendation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of personalized recipe recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The name of the recipe
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *           description: List of ingredients required for the recipe
 *         instructions:
 *           type: array
 *           items:
 *             type: string
 *           description: Step-by-step instructions on how to prepare the recipe
 *         category:
 *           type: string
 *           description: The category of the recipe (e.g., breakfast, lunch, dinner, dessert)
 *         prepTime:
 *           type: number
 *           description: Preparation time in minutes
 *         cookTime:
 *           type: number
 *           description: Cooking time in minutes
 *         totalTime:
 *           type: number
 *           description: Total time in minutes (prepTime + cookTime)
 *         servings:
 *           type: number
 *           description: Number of servings
 *         nutrition:
 *           type: object
 *           properties:
 *             calories:
 *               type: number
 *             protein:
 *               type: number
 *             fat:
 *               type: number
 *             carbohydrates:
 *               type: number
 *           description: Nutritional information per serving
 *         author:
 *           type: string
 *           description: The author of the recipe
 *         datePublished:
 *           type: string
 *           format: date
 *           description: The date when the recipe was published
 *         image:
 *           type: string
 *           description: URL to the image of the recipe
 *         notes:
 *           type: string
 *           description: Additional notes or tips for the recipe
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the recipe (e.g., vegan, gluten-free)
 *         reviews:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Review'
 *           description: List of reviews for the recipe
 *         averageRating:
 *           type: number
 *           description: Average rating of the recipe
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: The user who made the review
 *         recipe:
 *           type: string
 *           description: The ID of the recipe being reviewed
 *         rating:
 *           type: number
 *           description: Rating given to the recipe (1-5)
 *         comment:
 *           type: string
 *           description: The review comment
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the review was created
 */

router.get('/recommendations', protect, getPersonalizedRecommendations);

module.exports = router;
