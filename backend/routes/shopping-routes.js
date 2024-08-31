const express = require('express');
const {
    createShoppingList,
    getShoppingList,
    updateShoppingList,
    deleteShoppingList
} = require('../controllers/shopping-controller');
const { protect } = require('../middlewares/protect');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Shopping Lists
 *   description: API to manage shopping lists
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ShoppingList:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: ID of the user who created the shopping list
 *         mealPlan:
 *           type: string
 *           description: ID of the meal plan associated with the shopping list
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the shopping list item
 *               quantity:
 *                 type: string
 *                 description: Quantity of the shopping list item
 *       required:
 *         - user
 *         - mealPlan
 *         - items
 */
/**
 * @swagger
 * /api/shopping/create:
 *   post:
 *     summary: Create a new shopping list
 *     tags: [Shopping Lists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mealPlan:
 *                 type: string
 *                 description: ID of the meal plan associated with the shopping list
 *                 example: 6123456789abcdef01234567
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Name of the shopping list item
 *                       example: Tomatoes
 *                     quantity:
 *                       type: string
 *                       description: Quantity of the shopping list item
 *                       example: 2 kg
 *             required:
 *               - mealPlan
 *               - items
 *     responses:
 *       201:
 *         description: Shopping list successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingList'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/shopping/list:
 *   get:
 *     summary: Get the current user's shopping list
 *     tags: [Shopping Lists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Shopping list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingList'
 *       404:
 *         description: No shopping list found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/shopping/update:
 *   put:
 *     summary: Update the current user's shopping list
 *     tags: [Shopping Lists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingList'
 *     responses:
 *       200:
 *         description: Shopping list updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingList'
 *       404:
 *         description: No shopping list found to update
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/shopping/delete:
 *   delete:
 *     summary: Delete the current user's shopping list
 *     tags: [Shopping Lists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Shopping list deleted successfully
 *       404:
 *         description: No shopping list found to delete
 *       500:
 *         description: Server error
 */


router.post('/create', protect, createShoppingList);
router.get('/list', protect, getShoppingList);
router.put('/update', protect, updateShoppingList);
router.delete('/delete', protect, deleteShoppingList);

module.exports = router;
