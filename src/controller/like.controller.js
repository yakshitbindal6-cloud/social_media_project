import { add_like,remove_like } from "../services/like.service.js";
import { sendSuccess } from "../utils/api_response.js";

export async function make_like(req,res){
    const user_id=req.params.userId;
    const likeable_id=req.params.id;
    const onmodel=req.params.onmodel;
    const like=await add_like(user_id,likeable_id,onmodel);
    return sendSuccess(res,like,"like added successfully",201);
}
export async function dislike(req,res){
    const user_id=req.params.userId;
    const like_id=req.params.id;
    const result=await remove_like(user_id,like_id);
    return sendSuccess(res,result,"like deleted successfully");
}