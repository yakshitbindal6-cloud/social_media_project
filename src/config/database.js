import mongoose from "mongoose"
import { mongo_url} from "./env.js"

export async function connectToDatabase(){
    try{
        await mongoose.connect(mongo_url);
        console.log("MongoDB Connected");
    }
    catch(err){
        console.error("error connecting to database",err);
        process.exit(1);
    }

}