import express from "express";
import { createPost, updatePost, deletePost, getPost, listPosts } from "../controller/post.controller.js";
import validateParam from "../middlewares/validateParam.js";
import { validate } from "../middlewares/validation.js";
import { createPostSchema, updatePostSchema } from "../dtos/post.dto.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Post management
 */

/**
 * @swagger
 * /api/posts/{userId}:
 *   post:
 *     summary: Create a post for a user
 *     tags: [Posts]
 *     parameters:
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
 *               caption:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created
 */
router.post("/:userId", validateParam("userId"), validate(createPostSchema), createPost);

/**
 * @swagger
 * /api/posts/{userId}/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
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
 *               caption:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated
 */
router.put("/:userId/:id", validateParam("userId"), validateParam("id"), validate(updatePostSchema), updatePost);

/**
 * @swagger
 * /api/posts/{userId}/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
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
 *         description: Post deleted
 */
router.delete("/:userId/:id", validateParam("userId"), validateParam("id"), deletePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a single post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Post returned
 */
router.get("/:id", validateParam("id"), getPost);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: List posts (paged)
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of posts
 */
router.get("/", listPosts);

export default router;
