import { add_user,update_user,get_user_by_id, deleteLikesByUserId, deleteLikesByPostIds, deleteCommentsByIds, deleteLikesByCommentIds, deleteCommentsByUserId, deletePostsByUserId, remove_user } from "../repository/user.repository";
import { badRequest,notFound } from "../utils/api_error";
import { getUserbyUsername,getUserbyemail,getPostsByUser,getCommentsByPosts,getReplies_onComment} from "../repository/user.repository";
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
        await session.withTransaction(async () => {
            // ensure user exists within transaction
            const user = await get_user_by_id(user_id, session);
            if (!user) throw notFound("user not found");

            // posts by user
            const posts = await getPostsByUser(user_id, session);
            const postIds = posts.map(p => p._id);

            // gather all comments under those posts (BFS)
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

            // delete likes authored by user
            await deleteLikesByUserId(user_id, session);

            // delete likes on posts
            if (postIds.length > 0) {
                await deleteLikesByPostIds(postIds, session);
            }

            // delete likes on comments and comment documents
            if (allCommentIds.length > 0) {
                await deleteLikesByCommentIds(allCommentIds, session);
                await deleteCommentsByIds(allCommentIds, session);
            }

            // delete comments authored by user
            await deleteCommentsByUserId(user_id, session);

            // delete posts by user
            await deletePostsByUserId(user_id, session);

            // finally remove user
            await remove_user(user_id, session);

            result = { message: "User and all associated data deleted successfully" };
        });
        return result;
    } finally {
        session.endSession();
    }
}