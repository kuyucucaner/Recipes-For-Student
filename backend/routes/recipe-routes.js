const express = require("express");
const router = express.Router();
const RecipeController = require("../controllers/recipe-controller");
const {protect} = require('../middlewares/protect');
const VideoUploadService = require('../services/video-upload-service');
/**
 * @swagger
 * components:
 *   schemas:
 *     RecipeModel:
 *       type: object
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
 *         video:
 *           type: string
 *           format: binary
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
 */
/**
 * @swagger
 * /api/recipes:
 *   post:
 *     summary: Create a new recipe with an optional video
 *     tags: [Recipe]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the recipe
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of ingredients
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of cooking instructions
 *               category:
 *                 type: string
 *                 description: Category of the recipe
 *               prepTime:
 *                 type: integer
 *                 format: int32
 *                 description: Preparation time in minutes
 *               cookTime:
 *                 type: integer
 *                 format: int32
 *                 description: Cooking time in minutes
 *               totalTime:
 *                 type: integer
 *                 format: int32
 *                 description: Total time required in minutes
 *               servings:
 *                 type: integer
 *                 format: int32
 *                 description: Number of servings
 *               nutrition:
 *                 type: object
 *                 description: Nutritional information
 *                 properties:
 *                   calories:
 *                     type: integer
 *                     format: int32
 *                     description: Number of calories
 *                   protein:
 *                     type: integer
 *                     format: int32
 *                     description: Amount of protein
 *                   fat:
 *                     type: integer
 *                     format: int32
 *                     description: Amount of fat
 *                   carbohydrates:
 *                     type: integer
 *                     format: int32
 *                     description: Amount of carbohydrates
 *               author:
 *                 type: string
 *                 description: Author of the recipe
 *               datePublished:
 *                 type: string
 *                 format: date-time
 *                 description: Date when the recipe was published
 *               image:
 *                 type: string
 *                 description: Image of the recipe
 *               notes:
 *                 type: string
 *                 description: Additional notes
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags associated with the recipe
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: Rating of the recipe
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: Video related to the recipe
 *     responses:
 *       201:
 *         description: Recipe created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeModel'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/recipes/detail/{id}:
 *   get:
 *     summary: Get a recipe by id 
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
 *         description: Recipe getting succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeModel'
 *       404:
 *         description: Recipe not found
 
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
router.get('/detail/:id', RecipeController.getRecipeById);
router.get("/filter", RecipeController.filterRecipes);
router.post("/", protect, VideoUploadService, RecipeController.addRecipe);
router.put("/:id",protect ,RecipeController.updateRecipe);
router.delete("/:id", protect ,RecipeController.deleteRecipe);

// REDİS 
/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Retrieve a recipe by its ID
 *     description: Fetches a recipe from the database by its unique identifier.
 *     tags: [REDIS Recipe]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Unique identifier of the recipe
 *         schema:
 *           type: string
 *           example: "66a8aaacd2c09c6b7697d06d"
 *     responses:
 *       200:
 *         description: Successfully retrieved the recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeModel'
 *       400:
 *         description: Invalid Recipe ID provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: 'Valid Recipe ID is required'
 *       404:
 *         description: Recipe not found with the provided ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: 'Recipe not found'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: 'Server Error'
 *                 error:
 *                   type: string
 *                   example: 'Detailed server error message'
 */

router.get('/:id', RecipeController.getRecipe);


module.exports = router;
