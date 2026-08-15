import { add_user,update_user,get_user_by_id, deleteLikesByUserId, deleteLikesByPostIds, deleteCommentsByIds, deleteLikesByCommentIds, deleteCommentsByUserId, deletePostsByUserId, remove_user } from "../repository/user.repository.js";
import { badRequest,notFound } from "../utils/api_error.js";
import { getUserbyUsername,getUserbyemail,getPostsByUser,getCommentsByPosts,getReplies_onComment} from "../repository/user.repository.js";
import  mongoose  from "mongoose";
export async function create_user(user_data){
    const Userby_username=await getUserbyUsername(user_data.username);
    if(Userby_username){
        throw badRequest("user with this username already exist");
    }
    const Userby_email=await getUserbyemail(user_data.email);
    if(Userby_email){
        throw badRequest("user with this email already exist");
    }
    const user=await add_user(user_data);
    return user;
}
export async function modify_user(user_id,update_data){
    const exist_user=await get_user_by_id(user_id);
    if(!exist_user)throw notFound("user not found");
    if(update_data.username && update_data.username!==exist_user.username){
        const user=await getUserbyUsername(update_data.username);
        if(user)throw badRequest("user with this username already exist");
    }
    if(update_data.email && update_data.email!==exist_user.email){
         const user=await getUserbyemail(update_data.email);
        if(user)throw badRequest("user with this email already exist");
    }
    return update_user(user_id,user_data);
}
export async function delete_user(user_id){
    const session = await mongoose.startSession();
    try {
        let result = null;
        return await session.withTransaction(async () => {
            const user = await get_user_by_id(user_id, session);
            if (!user) throw notFound("user not found");
            const posts = await getPostsByUser(user_id, session);
            const postIds = posts.map(p => p._id);
            let allCommentIds = [];
            let queue = [];
            if (postIds.length > 0) {
                const topComments = await getCommentsByPosts(postIds, session);
                queue = topComments.map(c => c._id);
            }
            while (queue.length > 0) {
                const ids = queue.splice(0, queue.length);
                allCommentIds.push(...ids);
                const children = await getReplies_onComment(ids, session);
                queue.push(...children.map(c => c._id));
            }
            await deleteLikesByUserId(user_id, session);
            if (postIds.length > 0) {
                await deleteLikesByPostIds(postIds, session);
            }
            if (allCommentIds.length > 0) {
                await deleteLikesByCommentIds(allCommentIds, session);
                await deleteCommentsByIds(allCommentIds, session);
            }
            await deleteCommentsByUserId(user_id, session);
            await deletePostsByUserId(user_id, session);
            await remove_user(user_id, session);
            return { message: "User and all associated data deleted successfully" };
        })
    } finally {
        session.endSession();
    }
}
export async function get_user(user_id){
    const user=await get_user_by_id(user_id);
    if(!user)throw notFound("user not found");
    return user;
}
