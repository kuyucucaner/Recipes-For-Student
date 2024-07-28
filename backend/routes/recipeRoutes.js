// backend/routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/recipeController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - title
 *         - ingredients
 *         - instructions
 *       properties:
 *         title:
 *           type: string
 *         ingredients:
 *           type: string
 *         instructions:
 *           type: string
 * 
 * /api/recipes:
 *   get:
 *     summary: Retrieve a list of recipes
 *     responses:
 *       200:
 *         description: A list of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *   post:
 *     summary: Create a new recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       201:
 *         description: Recipe created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 */
router.get('/', RecipeController.getRecipes);
router.post('/', RecipeController.addRecipe);

module.exports = router;
