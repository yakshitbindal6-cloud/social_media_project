import { Comment } from "../schema/comment.js";
import { Post } from "../schema/post.js";
import { notFound } from "../utils/api_error.js";
import { Like } from "../schema/like.js";

export async function create_comment(comment_data){
    const comment =await Comment.create(comment_data);
    return comment;
}
export async function get_comment(comment_id,session=null){
    const q= Comment.findById(comment_id).populate("user").populate("replies");
    if(session)q.session(session);
    return await q.exec();
}
export async function update_comment(comment_id,comment_data){
    const comment=Comment.findByIdAndUpdate(comment_id,comment_data,{new:true});
    return comment;
}
export async function delete_comment(comment_id, session=null){
    const q=Comment.findByIdAndDelete(comment_id);
    if(session)q.session(session);
    return await q.exec();
}
export async function delete_likes_onComment(comment_id,session=null){
    const q= Like.deleteMany({
        onmodel:'Comment',
        like_id:comment_id
    });
    if(session)q.session(session);
    return await q.exec();
}
export async function remove_comment_from_post(post_id,comment_id,session=null){
    const q= Post.findByIdAndUpdate(post_id,{$pull:{comments:comment_id}},{new:true});
    if(session)q.session(session);
    return await q.exec();
}
export async function add_comment_to_reply(comment_id,reply_id,session=null){
    const q= Comment.findByIdAndUpdate(comment_id,{$push:{replies:reply_id}},{new:true});
    if(session)q.session(session);
    return await q.exec();
}
export async function remove_comment_from_reply(comment_id,reply_id,session=null){
    const q= Comment.findByIdAndUpdate(comment_id,{$pull:{replies:reply_id}},{new:true});
    if(session)q.session(session);
    return await q.exec();
}