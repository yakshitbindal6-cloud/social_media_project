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

router.post(
  "/:postId/:userId",
  validateParam("postId"),
  validateParam("userId"),
  validate(createCommentSchema),
  createComment
);
router.post(
  "/reply/:commentId/:userId",
  validateParam("commentId"),
  validateParam("userId"),
  validate(createCommentSchema),
  createReply
);

router.get("/:id", validateParam("id"), getComment);

router.put(
  "/:userId/:id",
  validateParam("userId"),
  validateParam("id"),
  validate(updateCommentSchema),
  updateComment
);

router.delete("/:userId/:id", validateParam("userId"), validateParam("id"), deleteComment);

export default router;
