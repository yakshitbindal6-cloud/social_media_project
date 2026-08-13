import express from "express";
import {
  createComment,
  createReply,
  getComment,
  updateComment,
  deleteComment,
} from "../controller/comment.controller.js";
import validateParam from "../middlewares/validateParam.js";
import { validate } from "../middlewares/validation.js";
import { createCommentSchema, updateCommentSchema } from "../dtos/comment.dto.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: Comment operations (comments & replies)
 */

/**
 * @swagger
 * /api/comments/{postId}/{userId}:
 *   post:
 *     summary: Create a comment on a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 */
router.post(
  "/:postId/:userId",
  validateParam("postId"),
  validateParam("userId"),
  validate(createCommentSchema),
  createComment
);

/**
 * @swagger
 * /api/comments/reply/{commentId}/{userId}:
 *   post:
 *     summary: Reply to a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reply created
 */
router.post(
  "/reply/:commentId/:userId",
  validateParam("commentId"),
  validateParam("userId"),
  validate(createCommentSchema),
  createReply
);

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Get a comment by id
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Comment returned
 */
router.get("/:id", validateParam("id"), getComment);

/**
 * @swagger
 * /api/comments/{userId}/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated
 */
router.put(
  "/:userId/:id",
  validateParam("userId"),
  validateParam("id"),
  validate(updateCommentSchema),
  updateComment
);

/**
 * @swagger
 * /api/comments/{userId}/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Comment deleted
 */
router.delete("/:userId/:id", validateParam("userId"), validateParam("id"), deleteComment);

export default router;
