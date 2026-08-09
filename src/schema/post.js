import mongoose from "mongoose";
const post_schema=new mongoose.Schema({
    caption:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    comments:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
    }
    ],
    likes:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like",
    }
    ]
},
    {timestamps:true}
);
export const Post= mongoose.model("Post",post_schema);