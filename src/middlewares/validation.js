import { badRequest } from "../utils/api_error";
export const validate = (schema) => (req,res,next)=>{
    const result = schema.safeParse(req.body);
    if(!result.success){
        throw badRequest("Validation failed",result.error.issues);
    }
    req.body=result.data
    next();
}
export const validat_param=(schema)=>(req,res,next)=>{
     const result = schema.safeParse(req.params);
    if(!result.success){
        throw badRequest("Validation failed",result.error.issues);
    }
    req.params=result.data;
    next();
}