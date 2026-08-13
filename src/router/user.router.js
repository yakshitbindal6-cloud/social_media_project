import express from "express";
import { register_user, modifyUser, deleteUser, find_user } from "../controller/user.controller.js";
import validateParam from "../middlewares/validateParam.js";
import { createUserSchema,updateUserSchema } from "../dtos/user.dto.js";
import { validate } from "../middlewares/validation.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
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
 *             required: [username, email]
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/", validate(createUserSchema), register_user);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: User found
 */
router.get("/:id", validateParam("id"), find_user);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 */
router.put("/:id", validateParam("id"), validate(updateUserSchema), modifyUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete("/:id", validateParam("id"), deleteUser);

export default router;