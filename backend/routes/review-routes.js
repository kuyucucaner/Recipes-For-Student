const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/review-controller');
const { protect } = require('../middleware/protect');


/**
 * @swagger
 * /api/reviews/{recipeId}/reviews:
 *   post:
 *     tags: [Recipe Reviews]
 *     summary: Add a review to a recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 description: Rating given by the user (1-5)
 *                 example: 5
 *               comment:
 *                 type: string
 *                 description: Review comment
 *                 example: "This recipe is amazing!"
 *     parameters:
 *       - name: recipeId
 *         in: path
 *         description: ID of the recipe
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Review successfully added
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/reviews/{recipeId}/reviews:
 *   get:
 *     tags: [Recipe Reviews]
 *     summary: Get all reviews for a recipe
 *     parameters:
 *       - name: recipeId
 *         in: path
 *         description: ID of the recipe
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews retrieved successfully
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Server error
 */


router.post('/:recipeId/reviews', protect, ReviewController.addReview);
router.get('/:recipeId/reviews', ReviewController.getReviewsByRecipeId);

module.exports = router;
