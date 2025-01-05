import RequestHandler from "../utlis/request/requestHandler";
import { Request,Response,NextFunction } from "express";
import Task from "../models/task.model";
import error from "../utlis/error/Error";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import mongoose from "mongoose";
const updatetaskField=RequestHandler(async(req:Request,res:Response,next:NextFunction)=>{
      try{
        const field = req.body;
        const id = req.query.id;
        if(!id){
         throw new error('Please Provide Task Id to Update',400);
        }
        const Task_Id=new mongoose.Types.ObjectId(id as string);
        if(!field){
         throw new error('Please Provide Field to Update',400);
        }
        const { title ,description, duedate,assign_to }=field;
        if(!title || !description  || !assign_to){
         throw new error('Please Provide Field to Update',400);
        }
        const Assignto_id =new mongoose.Types.ObjectId(assign_to.split('&')[0]);
        const Assignto_name =assign_to.split('&')[1];
        const Assignto_email =assign_to.split('&')[3];
        const Assignto_Phone =assign_to.split('&')[2];


       const task = await Task.findOneAndUpdate({
        $and:[{_id:Task_Id},{"createadby.id":req.user?._id}]
       },{$set:{
        title,
        description,
        duedate,
        assign_to:{
          id:Assignto_id,
          name:Assignto_name,
          email:Assignto_email,
          phone:Assignto_Phone
        }
     
       }});


       if(!task){
         throw new error(`Something went wrong and Field is not Update `,500);
       }
        
       const response= new ResponseData(task,200,'task field is Updated succesfully');
       ResponseHandler(res,response,200);
      }
      catch(error){
        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

    ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
      }
})

export default updatetaskField