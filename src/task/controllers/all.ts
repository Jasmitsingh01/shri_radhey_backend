import error from "../../utlis/error/Error";
import RequestHandler from "../../utlis/request/requestHandler";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import Task from "../models/task.model";
import { Request,Response ,NextFunction} from 'express'

const ALLTASK= RequestHandler(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const TASK=await Task.find();
        if(TASK.length<=0){
            throw  new error('No Task Found',501);

        }
        const response= new ResponseData(TASK,200,'All Task Found Successfuly');

        ResponseHandler(res,response,200);
    }
    catch(err){
        console.error(err)
    }
})


export default ALLTASK;