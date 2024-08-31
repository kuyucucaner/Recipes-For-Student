const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth-controller');
const { protect } = require('../middlewares/protect');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication routes
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     UserModel:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the user
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email address
 *         role:
 *           type: integer
 *           description: The user's role (0, 1, 2)
 *           enum: [0, 1, 2]
 *         isVerified:
 *           type: boolean
 *           description: Whether the user's email is verified
 *         verificationToken:
 *           type: string
 *           description: Token used for email verification (optional)
 *           nullable: true
 *         refreshToken:
 *           type: string
 *           description: Refresh token for authentication (optional)
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date when the user was last updated
 *       required:
 *         - username
 *         - email
 *         - password
 *         - role
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Bad request, invalid data
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad request, invalid credentials
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * tags:
 *   name: User Operation
 *   description: Operations that users can perform
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags: [User Operation]
 *     summary: Get the authenticated user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserModel'
 *       400:
 *         description: No access token provided
 *       401:
 *         description: Unauthorized or token expired
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     tags: [User Operation]
 *     summary: Update user information
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: number
 *             required:
 *               - username
 *               - email
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/UserModel'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     tags: [User Operation]
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: User role is not Admin
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/{userId}/favorites/{recipeId}:
 *   put:
 *     tags: [User Operation]
 *     summary: Add a recipe to the user's favorites
 *     description: Adds a specified recipe to the list of favorite recipes for a given user.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *       - name: recipeId
 *         in: path
 *         description: ID of the recipe to add to favorites
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe successfully added to favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the user
 *                 favoriteRecipes:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of favorite recipe IDs
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
/**
 * @swagger
 * /api/users/{userId}/favorites:
 *   get:
 *     tags: [User Operation]
 *     summary: Get the list of favorite recipes for a user
 *     description: Retrieves the list of favorite recipes for the specified user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of favorite recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RecipeModel'
 *       400:
 *         description: No access token provided
 *       401:
 *         description: Unauthorized or token expired
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/:userId/favorites', protect, AuthController.getFavoriteRecipeListByUserId);
router.delete('/:userId', protect, AuthController.deleteUserById);
router.put('/:userId', protect, AuthController.updateUserById);
router.put('/:userId/favorites/:recipeId', protect, AuthController.addFavoriteRecipe);
router.get('/profile', protect, AuthController.getUserById);
router.post('/register', AuthController.registerUser);
router.get('/verify/:token', AuthController.verifyEmail);
router.post('/login', AuthController.authUser);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/logout', protect, AuthController.logoutUser);

module.exports = router;
