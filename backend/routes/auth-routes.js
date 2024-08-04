const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth-controller');
const { protect } = require('../middleware/protect');
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
 * /api/users/profile:
 *   get:
 *     tags: [Authentication]
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
 *     tags: [Authentication]
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
 *     tags: [Authentication]
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

router.delete('/:userId' , protect , AuthController.deleteUserById);
router.put('/:userId', protect, AuthController.updateUserById);
router.get('/profile', AuthController.getUserById);
router.post('/register', AuthController.registerUser);
router.get('/verify/:token', AuthController.verifyEmail);
router.post('/login', AuthController.authUser);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/logout', protect, AuthController.logoutUser);

module.exports = router;
