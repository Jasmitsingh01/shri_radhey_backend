import RequestHandler from "../utlis/request/requestHandler";
import { Request,Response,NextFunction } from "express";
import Task from "../models/task.model";
import error from "../utlis/error/Error";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";

const  CreateTak= RequestHandler( async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {title, description, assign_to}=req.body;
        const {user}=req;
        
        const task= new Task({
            title:title,
            description:description,
            createadby:user?._id,
            assign_to:assign_to,
        });

        const save= await task.save();
        if(!save){
            throw new error('failed to create Task',500);
        }
        const respone = new ResponseData(save,201,'Task created successfully');

        ResponseHandler(res,respone,201);

    }
    catch(err){
        console.error(err)
    }
});



export default CreateTak