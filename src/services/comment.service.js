import { create_comment ,get_comment,update_comment,delete_comment,delete_likes_onComment,remove_comment_from_post,add_comment_to_reply,remove_comment_from_reply} from "../repository/comment.repository.js";
import { deleteLikesByCommentIds, get_user_by_id, getReplies_onComment,deleteCommentsByIds } from "../repository/user.repository.js";
import { forbidden,notFound } from "../utils/api_error";
import { add_comment_to_post } from "../repository/post.repository.js";
import mongoose from "mongoose";

export async function add_comment(userId, commentableId, onmodel, body) {
    const session = await mongoose.startSession();
    try {
        return await session.withTransaction(async () => {
            const user = await get_user_by_id(userId);
            if (!user) throw notFound("user not found");
            const comment_data = { ...body, user: userId, commentableId, onmodel };
            const comment = await create_comment(comment_data, session);
            if (onmodel === "Post") {
                await add_comment_to_post(commentableId, comment._id, session);
            } else if (onmodel === "Comment") {
                await add_comment_to_reply(commentableId, comment._id, session);
            }
            return comment;
        });
    } finally {
        await session.endSession();
    }
}
export async function retrive_comment(comment_id){
    const comment=await get_comment(comment_id);
    if(!comment)throw notFound("comment not found");
    return comment;
}
export async function modify_comment(user_id,comment_id,comment_data){
    const comment=await get_comment(comment_id);
    if(!comment)throw notFound("comment not found");
    if(comment.user.toString()!==user_id.toString()){
        throw forbidden("you are not allowed to update the comment");
    }
    return await update_comment(comment_id,comment_data);
}
export async function remove_comment(user_id, comment_id) {
    const session = await mongoose.startSession();
    try {
        return await session.withTransaction(async () => {
            const comment = await get_comment(comment_id, session);
            if (!comment) throw notFound("comment not found");
            if (comment.user.toString() !== user_id.toString()) {
                throw forbidden("you are not allowed to delete the comment");
            }
            if (comment.onmodel === "Post") {
                await remove_comment_from_post(comment.commentableId, comment_id, session);
            } else if (comment.onmodel === "Comment") {
                await remove_comment_from_reply(comment.commentableId, comment_id, session);
            }
            const allCommentIds = [];
            let queue = comment.replies.map((c) => c._id);
            while (queue.length > 0) {
                const ids = queue.splice(0, queue.length);
                allCommentIds.push(...ids);
                const children = await getReplies_onComment(ids, session);
                queue.push(...children.map((c) => c._id));
            }
            await delete_likes_onComment(comment_id, session);
            if (allCommentIds.length > 0) {
                await deleteLikesByCommentIds(allCommentIds, session);
                await deleteCommentsByIds(allCommentIds, session);
            }
            await delete_comment(comment_id, session);
            return { message: "Comment and all associated data deleted successfully" };
        });
    } finally {
        await session.endSession();
    }
}