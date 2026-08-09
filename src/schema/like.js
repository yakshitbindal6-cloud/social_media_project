import mongoose from "mongoose";
const like_schema=new mongoose.Schema({
    onmodel:{
        type:String,
        required:true,
        enum:["Post","Comment"]
    },
    like_id:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:"onmodel",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},
    {timestamps:true},
)
export const Like=mongoose.model("Like",like_schema);