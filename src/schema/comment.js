import mongoose from "mongoose";
const comment_schema=new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    onmodel:{
        type:String,
        required:true,
        enum:["Post","Comment"]
    },
    commentableId:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:"onmodel",
        required:true
    },
    replies:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Like"
        }
    ]
},
    {timestamps:true}
)
export const Comment= mongoose.model("Comment",comment_schema);