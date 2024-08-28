const express = require('express');
const { createMealPlan, getMealPlan } = require('../controllers/meal-controller');
const { protect } = require('../middlewares/protect');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Meal Plans
 *   description: API to manage meal plans
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Meal:
 *       type: object
 *       properties:
 *         day:
 *           type: string
 *           enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
 *           description: The day of the week
 *         meals:
 *           type: array
 *           items:
 *             type: string
 *             description: ID of a meal (Recipe ID)
 *       required:
 *         - day
 *         - meals
 * 
 *     MealPlan:
 *       type: object
 *       properties:
 *         weekStartDate:
 *           type: string
 *           format: date
 *           description: The start date of the week for the meal plan
 *         meals:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Meal'
 *           description: List of meals for each day
 *       required:
 *         - weekStartDate
 *         - meals
 */

/**
 * @swagger
 * /api/meal/create-meal:
 *   post:
 *     summary: Create a new meal plan
 *     tags: [Meal Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MealPlan'
 *     responses:
 *       201:
 *         description: Meal plan successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MealPlan'
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/meal/meal-plan:
 *   get:
 *     summary: Get the current user's meal plan
 *     description: Retrieves the meal plan for the user who is currently authenticated. The user ID is automatically inferred from the authentication token.
 *     tags: [Meal Plans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Meal plan retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MealPlan'
 *       404:
 *         description: No meal plan found for the current user
 *       500:
 *         description: Server error
 */


router.get('/meal-plan', protect, getMealPlan);
router.post('/create-meal', protect, createMealPlan);

module.exports = router;
