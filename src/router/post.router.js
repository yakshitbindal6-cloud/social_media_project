import express from "express";
import { createPost, updatePost, deletePost, getPost, listPosts } from "../controller/post.controller.js";
import validateParam from "../middlewares/validateParam.js";
import { validate } from "../middlewares/validation.js";
import { createPostSchema, updatePostSchema } from "../dtos/post.dto.js";
const router = express.Router();

router.post("/:userId", validateParam("userId"), validate(createPostSchema), createPost);
router.put("/:userId/:id", validateParam("userId"), validateParam("id"), validate(updatePostSchema), updatePost);
router.delete("/:userId/:id", validateParam("userId"), validateParam("id"), deletePost);
router.get("/:id", validateParam("id"), getPost);
router.get("/", listPosts);

export default router;
