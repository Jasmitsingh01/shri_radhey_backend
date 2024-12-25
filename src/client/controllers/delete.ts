import error from "../utlis/error/Error";
import RequestHandler from "../utlis/request/requestHandler";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import client from "../models/client.model";
import { Request,Response ,NextFunction} from 'express'

const delClient=RequestHandler(async (req:Request,res:Response,next:NextFunction)=>{
 
    try {
        
        const id=req.query.id
        if(!id){
            throw new error('Invalid request',400)
        }
        const clientDelete= await client.findByIdAndDelete(id);

        if(!clientDelete){
            throw new error('Failed to Delete client' ,500)
        }

        const response= new ResponseData('',200," Client Delete Successfully");

        ResponseHandler(res,response ,200)


    } catch (error) {
        console.error(error)
    }
});

export default delClient;