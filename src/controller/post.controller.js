import { create_post, modify_post, remove_post, get_post, ListPosts } from "../services/post.service.js";
import { sendSuccess } from "../utils/api_response.js";

export async function createPost(req, res) {
  const userId = req.params.userId;
  const postData = req.body;
  postData.user = userId;
  const post = await create_post(postData);
  return sendSuccess(res, post, "Post created", 201);
}

export async function updatePost(req, res) {
  const userId = req.params.userId;
  const postId = req.params.id;
  const updated = await modify_post(userId, postId, req.body);
  return sendSuccess(res, updated, "Post updated");
}

export async function deletePost(req, res) {
  const userId = req.params.userId;
  const postId = req.params.id;
  const post = await get_post(postId);
  if (post.user._id.toString() !== userId.toString()) {
    return res.status(403).json({ success: false, message: "Not allowed" });
  }
  await remove_post(postId);
  return sendSuccess(res, null, "Post deleted");
}

export async function getPost(req, res) {
  const postId = req.params.id;
  const post = await get_post(postId);
  return sendSuccess(res, post);
}

export async function listPosts(req, res) {
  const page = parseInt(req.query.page || "1", 10);
  const limit = parseInt(req.query.limit || "10", 10);
  const data = await ListPosts(page, limit);
  return sendSuccess(res, data);
}
