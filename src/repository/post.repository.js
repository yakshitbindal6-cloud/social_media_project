import { Post} from "../schema/post.js";
import { Comment } from "../schema/comment.js";
import { Like } from "../schema/like.js";

export async function add_post(post_data){
    const user=await Post.findOne({user:post_data.user});
    const post=await Post.create(post_data);
    return post;
}
export async function update_post(post_id,post_data, session=null){
    const q=Post.findByIdAndUpdate(post_id,post_data,{new:true});
    if(session)q.session(session);
    return await q.exec();
}
export async function get_post_ByID(post_id, session=null){
    const q= Post.findById(post_id).populate("user").populate("comments").populate("likes");
    if(session)q.session(session);
    return await q.exec();
}
export async function delete_post(post_id, session=null){
    const q= Post.findByIdAndDelete(post_id);
    if(session)q.session(session);
    return await q.exec();
}
export async function deleteLikesByPostId(post_id, session=null){
    const q= Like.deleteMany({
        onmodel:"Post",
        like_id:post_id
    })
    if(session)q.session(session);
    return await q.exec();
}
export async function List_posts(limit,offset){
    const posts = (await (await Post.find().populate("user")).sort({ createdAt: -1 }).skip(offset).limit(limit));
    const totalPosts = await Post.countDocuments();
    return {
        posts,
        pagination: {
           limit,
           totalPosts,
           currentPage: Math.floor(offset / limit) + 1,
           totalPages: Math.ceil(totalPosts / limit),
        },
    }
}
export async function add_comment_to_post(post_id,comment_id,session=null){
    const q= Post.findByIdAndUpdate(post_id,{$push:{comments:comment_id}},{new:true});
    if(session)q.session(session);
    return await q.exec();
}