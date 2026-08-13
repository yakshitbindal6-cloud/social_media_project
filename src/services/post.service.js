import { get_post_ByID ,deleteLikesByPostId, delete_post, add_post, update_post,List_posts } from "../repository/post.repository.js";
import { deleteCommentsByIds, deleteLikesByCommentIds, getReplies_onComment } from "../repository/user.repository.js";
import { badRequest,notFound,forbidden } from "../utils/api_error.js";
import  mongoose  from "mongoose";
import { get_user } from "./user.service.js";

export async function create_post(post_data){
    const user=await get_user(post_data.user);
    if(!user)throw notFound("user not found");
    const post=await add_post(post_data);
    return post;
}
export async function modify_post(user_id,post_id,post_data){
    const post=await get_post_ByID(post_id);
    if (!post) {
        throw notFound("post not found");
    }
    if(post.user._id.toString()!==user_id.toString()){
        throw forbidden("you are not allowed to update this post");
    }
    const updatedPost=await update_post(post_id,post_data);
    return updatedPost;
}
export async function remove_post(post_id){
    const session = await mongoose.startSession();
    try{
        return await session.withTransaction(async() =>{
            const post=await get_post_ByID(post_id,session);
            if(!post)throw notFound("post not found");
            let queue=post.comments.map(c=> c._id);
            const allCommentIds=[];
            while(queue.length>0){
                const ids=queue.splice(0,queue.length);
                allCommentIds.push(...ids);
                const children=await getReplies_onComment(ids,session);
                queue.push(...children.map(c => c._id));
            }
            await deleteLikesByPostId(post_id,session)
            if(allCommentIds.length>0){
                await deleteLikesByCommentIds(allCommentIds,session);
            }
            await deleteCommentsByIds(allCommentIds,session);
            await delete_post(post_id);
            return {message:"Post and all associated data deleted successfully"};
        })
    }finally{
        await session.endSession();
    }
}
export async function get_post(post_id){
    const post =await get_post_ByID(post_id);
    if(!post)throw notFound("post not found");
    return post;
}
export async function ListPosts(page,limit){
    const offset = (page - 1) * limit;
    const posts=await List_posts(limit,offset);
    return posts;
    
}