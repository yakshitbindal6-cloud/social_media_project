import { ApiError} from "../utils/api_error.js";
export function error_hander(err,req,res,next){
    if(err instanceof ApiError){
        const body={
            success:false,
            message:err.message
        }
        if(err.detail)body.detail=err.detail
        res.status(err.statusCode).json(body);
        return
    }
    console.log("error",err);
    const body={
        success:false,
        message:"something went wrong"
    }
    res.status(500).json(body);
}