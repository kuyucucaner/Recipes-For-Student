const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/recipe-controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     RecipeModel:
 *       type: object
 *       required:
 *         - title
 *         - ingredients
 *         - instructions
 *         - category
 *         - prepTime
 *         - cookTime
 *         - totalTime
 *         - servings
 *         - nutrition
 *         - author
 *         - datePublished
 *         - image
 *         - notes
 *         - tags
 *         - rating
 *       properties:
 *         title:
 *           type: string
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *         instructions:
 *           type: array
 *           items:
 *             type: string
 *         category:
 *           type: string
 *         prepTime:
 *           type: number
 *           format: int32
 *         cookTime:
 *           type: number
 *           format: int32
 *         totalTime:
 *           type: number
 *           format: int32
 *         servings:
 *           type: number
 *           format: int32
 *         nutrition:
 *           type: object
 *           required:
 *             - calories
 *             - protein
 *             - fat
 *             - carbohydrates
 *           properties:
 *             calories:
 *               type: number
 *               format: int32
 *             protein:
 *               type: number
 *               format: int32
 *             fat:
 *               type: number
 *               format: int32
 *             carbohydrates:
 *               type: number
 *               format: int32
 *         author:
 *           type: string
 *         datePublished:
 *           type: string
 *           format: date-time
 *         image:
 *           type: string
 *         notes:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         rating:
 *           type: number
 *           format: float
 */

/**
 * @swagger
 * tags:
 *   name: Recipe
 *   description: Recipe management
 */

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Retrieve a list of recipes
 *     tags: [Recipe]
 *     responses:
 *       200:
 *         description: A list of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RecipeModel'
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecipeModel'
 *     responses:
 *       201:
 *         description: Recipe created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeModel'
 */

/**
 * @swagger
 * /api/recipes/{id}:
 *   put:
 *     summary: Update an existing recipe
 *     tags: [Recipe]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Recipe ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecipeModel'
 *     responses:
 *       200:
 *         description: Recipe updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeModel'
 *       404:
 *         description: Recipe not found
 *   delete:
 *     summary: Delete an existing recipe
 *     tags: [Recipe]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Recipe ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeModel'
 *       404:
 *         description: Recipe not found
 */

router.get('/', RecipeController.getRecipes);
router.post('/', RecipeController.addRecipe);
router.put('/:id', RecipeController.updateRecipe);
router.delete('/:id', RecipeController.deleteRecipe);

module.exports = router;
