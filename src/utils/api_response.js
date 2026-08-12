
export function sendSuccess(res,data,message=null,statusCode=200){
    const body={
        success:true,
        data
    }
    if(message)body.message=message
    res.status(statusCode).json(body)
}