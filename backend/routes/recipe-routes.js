const express = require("express");
const router = express.Router();
const RecipeController = require("../controllers/recipe-controller");
const {protect} = require('../middleware/protect');
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


/**
 * @swagger
 * /api/recipes/filter:
 *   get:
 *     summary: Filter recipe list
 *     tags: [Recipe]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword for recipe title.
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category of the recipe.
 *       - in: query
 *         name: prepTime
 *         schema:
 *           type: integer
 *         description: Maximum preparation time in minutes.
 *       - in: query
 *         name: cookTime
 *         schema:
 *           type: integer
 *         description: Maximum cooking time in minutes.
 *     responses:
 *       200:
 *         description: A list of filtered recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RecipeModel'
 *       404:
 *         description: Recipes not found
 *       500:
 *         description: Server error
 */


router.get("/", RecipeController.getRecipes);
router.post("/", protect,RecipeController.addRecipe);
router.put("/:id",protect ,RecipeController.updateRecipe);
router.delete("/:id", protect ,RecipeController.deleteRecipe);
router.get("/filter", RecipeController.filterRecipes);

module.exports = router;
