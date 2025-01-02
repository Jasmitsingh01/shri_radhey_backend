import RequestHandler from "../utlis/request/requestHandler";
import { Request,Response,NextFunction } from "express";
import Task from "../models/task.model";
import error from "../utlis/error/Error";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
const updatetaskField=RequestHandler(async(req:Request,res:Response,next:NextFunction)=>{
      try{
        const field = req.body;
        if(!field){
         throw new error('Please Provide Field to Update',400);
        }
       const task = await Task.findOneAndUpdate({},{$set:{
        ...field
       }}).and([{_id:field._id},{createadby:req.user?._id}]);


       if(!task){
         throw new error(`Something went wrong and Field is not Update `,500);
       }
        
       const response= new ResponseData(task,200,'task field is Updated succesfully');
       ResponseHandler(res,response,200);
      }
      catch(err){
        console.error(err)
      }
})

export default updatetaskField