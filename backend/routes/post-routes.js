const express = require('express');
const { shareRecipe , getRecipePost } = require('../controllers/post-controller');
const { protect } = require('../middlewares/protect');
const PostModel = require('../models/post-model');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PostModel:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: ID of the user who created the post
 *         recipe:
 *           type: string
 *           description: Recipe content
 *         caption:
 *           type: string
 *           description: Caption for the post
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *           description: List of user IDs who liked the post
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the post was created
 *       required:
 *         - user
 *         - recipe
 *         - caption
 *       example:
 *         user: "66ae5e91fce0a1d9417b54ab"
 *         recipe: "66c7a888057cebe2efcaf437"
 *         caption: "Delicious recipe!"
 *         likes: ["66ae5e91fce0a1d9417b54ab"]
 *         createdAt: "2024-08-28T12:34:56.789Z"
 */

/**
 * @swagger
 * /api/post/create:
 *   post:
 *     summary: Share a new recipe post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostModel'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Post successfully created
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

router.post('/create', protect , shareRecipe);

/**
 * @swagger
 * /api/post/recipe-post:
 *   get:
 *     summary: get all recipe posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Posts getting successfully
 *       500:
 *         description: Server error
 */
router.get('/recipe-post', getRecipePost);
module.exports = router;
