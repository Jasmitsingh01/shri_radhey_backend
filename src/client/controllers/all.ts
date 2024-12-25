import error from "../utlis/error/Error";
import RequestHandler from "../utlis/request/requestHandler";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import client from "../models/client.model";
import { Request,Response ,NextFunction} from 'express'

const ALLclient= RequestHandler(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const clientUers=await client.find();
        if(client.length<=0){
            throw  new error('No client Found',501);

        }
        const response= new ResponseData(clientUers,200,'All client Found Successfuly');

        ResponseHandler(res,response,200);
    }
    catch(err){
        console.error(err)
    }
})


export default ALLclient;