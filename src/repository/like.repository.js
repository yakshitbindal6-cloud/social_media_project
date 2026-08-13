import { Like } from "../schema/like";
import { Post } from "../schema/post";
import { Comment } from "../schema/comment";
export async function create_like(like_data){
    const like=await Like.create(like_data);
    return like;
}
export async function delete_like(like_id,session=null){
    const q=Like.findByIdAndDelete(like_id);
    if(session)q.session(session);
    return await q.exec();
}
export async function add_like_to_post(post_id,like_id,session=null){
    const q= Post.findByIdAndUpdate(post_id,{$push:{likes:like_id}},{new:true});
    if(session)q.session(session);
    return await q.exec();
}
export async function add_like_to_comment(comment_id,like_id,session=null){
    const q= Comment.findByIdAndUpdate(comment_id,{$push:{likes:like_id}},{new:true});
    if(session)q.session(session);
    return await q.exec();
}
export async function remove_like_from_post(post_id,like_id,session=null){
    const q= Post.findByIdAndUpdate(post_id,{$pull:{likes:like_id}},{new:true});
    if(session)q.session(session);
    return await q.exec();
}
export async function remove_like_from_comment(comment_id,like_id,session=null){
    const q= Comment.findByIdAndUpdate(comment_id,{$pull:{likes:like_id}},{new:true});
    if(session)q.session(session);
    return await q.exec();
}
export async function get_like(like_id,session=null){
    const q= Like.findById(like_id);
    if(session)q.session(session);
    return await q.exec();
}