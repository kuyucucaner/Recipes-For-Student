const express = require('express');
const { likePost, unlikePost } = require('../controllers/like-controller');
const { protect } = require('../middlewares/protect');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Likes
 */

/**
 * @swagger
 * /api/like/{id}/like:
 *   post:
 *     summary: Like a post
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to like
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Post successfully liked
 *       400:
 *         description: Already liked or bad request
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.post('/:id/like', protect, likePost);

/**
 * @swagger
 * /api/like/{id}/unlike:
 *   post:
 *     summary: Unlike a post
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to unlike
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Post successfully unliked
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.post('/:id/unlike', protect, unlikePost);

module.exports = router;
