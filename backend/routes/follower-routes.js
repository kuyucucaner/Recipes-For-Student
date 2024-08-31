const express = require('express');
const { followUser, unfollowUser, getFollowers, getFollowing } = require('../controllers/follower-controller');
const { protect } = require('../middlewares/protect');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Followers
 */

/**
 * @swagger
 * /api/follower/{id}/follow:
 *   post:
 *     summary: Follow a user
 *     tags: [Followers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to follow
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Follow is successful
 *       400:
 *         description: User already followed
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/follower/{id}/unfollow:
 *   post:
 *     summary: Unfollow a user
 *     tags: [Followers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to unfollow
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Unfollow is successful
 *       400:
 *         description: User not followed
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/follower/{id}/followers:
 *   get:
 *     summary: Get a user's followers
 *     tags: [Followers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to get followers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of followers
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/follower/{id}/following:
 *   get:
 *     summary: Get a user's following
 *     tags: [Followers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to get following
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of following users
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

// Route tanımlamaları
router.post('/:id/follow', protect, followUser);
router.post('/:id/unfollow', protect, unfollowUser);
router.get('/:id/followers', protect, getFollowers);
router.get('/:id/following', protect, getFollowing);

module.exports = router;
