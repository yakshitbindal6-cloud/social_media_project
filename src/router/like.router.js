import { make_like,dislike } from "../controller/like.controller.js";
import express from "express";
import validateParam from "../middlewares/validateParam.js";
import { validate } from "../middlewares/validation.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Likes
 *     description: Like operations (like & dislike)
 */

/**
 * @swagger
 * /api/likes/{userId}/{onmodel}/{likeableId}:
 *   post:
 *     summary: Like a post or comment
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: onmodel
 *         schema:
 *           type: string
 *           enum: [Post, Comment]
 *         required: true
 *       - in: path
 *         name: likeableId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       201:
 *         description: Like added successfully
 */
router.post("/:userId/:onmodel/:id", validateParam("userId"), validateParam("onmodel"), validateParam("id"), make_like);

/**
 * @swagger
 * /api/likes/{userId}/{likeId}:
 *   delete:
 *     summary: Dislike (remove like) from a post or comment
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: likeId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Like deleted successfully
 */
router.delete("/:userId/:id", validateParam("userId"), validateParam("id"), dislike);

export default router;