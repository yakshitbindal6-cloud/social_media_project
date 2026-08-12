import { User } from "../schema/user.js";
import { Post } from "../schema/post.js";
import { Like } from "../schema/like.js";
import { Comment } from "../schema/comment.js";
export async function add_user(user_data){
    const user=await User.create(user_data);
    return user;
}
export async function get_user_by_id(user_id, session = null){
    const q = User.findById(user_id);
    if (session) q.session(session);
    return await q.exec();
}
export async function getUserbyemail(user_email, session = null){
    const q = User.findOne({email:user_email});
    if (session) q.session(session);
    return await q.exec();
}
export async function getUserbyUsername(user_username, session = null){
    const q = User.findOne({username:user_username});
    if (session) q.session(session);
    return await q.exec();
}
export async function update_user(user_id,data, session = null){
    const q = User.findByIdAndUpdate(user_id,data,{new:true});
    if (session) q.session(session);
    return await q.exec();
} 
export async function remove_user(user_id, session = null){
    const q = User.findByIdAndDelete(user_id);
    if (session) q.session(session);
    return await q.exec();
}
export async function getPostsByUser(user_id, session = null){
    const q = Post.find({user:user_id}).select("_id");
    if (session) q.session(session);
    return await q.exec();
}
export async function getCommentsByPosts(postIds, session = null){
    const q = Comment.find({
        onmodel:"Post",
        commentableId:{
            $in:postIds
        }
    }).select("_id");
    if (session) q.session(session);
    return await q.exec();
}
export async function getReplies_onComment(commentIds, session = null){
    const q = Comment.find({
        onmodel:"Comment",
        commentableId:{
            $in:commentIds
        }
    }).select("_id");
    if (session) q.session(session);
    return await q.exec();
}
export async function deleteLikesByUserId(user_id, session = null){
    const q = Like.deleteMany({user:user_id});
    if (session) q.session(session);
    return await q.exec();
}
export async function deleteCommentsByUserId(user_id, session = null){
    const q = Comment.deleteMany({user:user_id});
    if (session) q.session(session);
    return await q.exec();
}
export const deletePostsByUserId = async (userId, session = null) => {
    const q = Post.deleteMany({ user: userId });
    if (session) q.session(session);
    return await q.exec();
};
export const deleteLikesByPostIds = async (postIds, session = null) => {
    const q = Like.deleteMany({
        onmodel: "Post",
        like_id: {
            $in: postIds
        }
    });
    if (session) q.session(session);
    return await q.exec();
};
export async function deleteLikesByCommentIds(commentIds, session = null){
    const q = Like.deleteMany({
        onmodel: "Comment",
        like_id: {
            $in: commentIds
        }
    });
    if (session) q.session(session);
    return await q.exec();
}
export async function deleteCommentsByIds(commentIds, session = null){
    const q = Comment.deleteMany({
        _id:{
            $in:commentIds
        }
    });
    if (session) q.session(session);
    return await q.exec();
}