import mongoose from "mongoose";

const user_schema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    role:{
        type:String,
        enum: ["user", "admin"],
        default:"user"
    }
},
    {timestamps:true}
);
export const User= mongoose.model("User",user_schema);
