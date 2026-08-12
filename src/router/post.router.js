import express from "express";
import { createPost, updatePost, deletePost, getPost, listPosts } from "../controller/post.controller.js";
import validateParam from "../middlewares/validateParam.js";
import { validate } from "../middlewares/validation.js";
import { createPostSchema, updatePostSchema } from "../dtos/post.dto.js";
const router = express.Router();

// Create post for a user: POST /posts/:userId
router.post("/:userId", validateParam("userId"), validate(createPostSchema), createPost);
// Update post for a user: PUT /posts/:userId/:id
router.put("/:userId/:id", validateParam("userId"), validateParam("id"), validate(updatePostSchema), updatePost);
// Delete post for a user: DELETE /posts/:userId/:id
router.delete("/:userId/:id", validateParam("userId"), validateParam("id"), deletePost);
// Get single post
router.get("/:id", validateParam("id"), getPost);
// List posts
router.get("/", listPosts);

export default router;
