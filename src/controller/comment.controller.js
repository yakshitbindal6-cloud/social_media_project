import { add_comment, retrive_comment, modify_comment, remove_comment } from "../services/comment.service.js";
import { sendSuccess } from "../utils/api_response.js";

export async function createComment(req, res) {
  const userId = req.params.userId;
  const postId = req.params.postId;
  const comment = await add_comment(userId, postId, "Post", req.body);
  return sendSuccess(res, comment, "Comment created", 201);
}

export async function createReply(req, res) {
  const userId = req.params.userId;
  const parentCommentId = req.params.commentId;
  const comment = await add_comment(userId, parentCommentId, "Comment", req.body);
  return sendSuccess(res, comment, "Reply created", 201);
}

export async function getComment(req, res) {
  const id = req.params.id;
  const comment = await retrive_comment(id);
  return sendSuccess(res, comment);
}

export async function updateComment(req, res) {
  const userId = req.params.userId;
  const commentId = req.params.id;
  const updated = await modify_comment(userId, commentId, req.body);
  return sendSuccess(res, updated, "Comment updated");
}

export async function deleteComment(req, res) {
  const userId = req.params.userId;
  const commentId = req.params.id;
  const result = await remove_comment(userId, commentId);
  return sendSuccess(res, result, "Comment deleted");
}
