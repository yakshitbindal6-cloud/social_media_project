import { create_like,delete_like,add_like_to_comment,add_like_to_post,get_like,remove_like_from_comment,remove_like_from_post } from "../repository/like.repository.js";
import mongoose from "mongoose";
import { forbidden,notFound } from "../utils/api_error.js";
export async function add_like(user_id,likeable_id,onmodel){
    const session=await mongoose.startSession();
    try{
        return await session.withTransaction(async()=>{
            const like_data={
                onmodel:onmodel,
                likeable_id:likeable_id,
                user:user_id
            }
            const like=await create_like(like_data,session);
            if(onmodel==="Post"){
                await add_like_to_post(likeable_id,like._id,session);
            }else if(onmodel==="Comment"){
                await add_like_to_comment(likeable_id,like._id,session);
            }
            return like;
        })
    }finally{
        await session.endSession();
    }
}
export async function remove_like(user_id,like_id){
    const session=await mongoose.startSession();
    try{
        return await session.withTransaction(async()=>{
            const like=await get_like(like_id,session);
            if(!like)throw notFound("like not found");
            if(like.user.toString()!==user_id.toString()){
                throw forbidden("you are not allowed to delete this like");
            }
            if(like.onmodel==='Post'){
                await remove_like_from_post(like.likeable_id,like._id,session);
            }else if(like.onmodel==='Comment'){
                await remove_like_from_comment(like.likeable_id,like._id,session);
            }
            await delete_like(like._id,session);
            return {message:"like deleted successfully"};
        })
    }finally{
        await session.endSession();
    }
}