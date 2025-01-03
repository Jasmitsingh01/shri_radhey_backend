import RequestHandler from "../utlis/request/requestHandler";
import { Request,Response,NextFunction } from "express";
import Task from "../models/task.model";
import error from "../utlis/error/Error";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";

const  CreateTak= RequestHandler( async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {task:{title, description ,dueDate}, empolyee:{assinged_to}}=req.body;
        const {user}=req;
        if(!title || !description || !assinged_to ){
            throw new error('All fields are required',400);
        }
        const id=assinged_to?.split('&')[0]
        const name=assinged_to?.split('&')[1]
        const email=assinged_to?.split('&')[3]
        const phone=assinged_to?.split('&')[2]
        if(!id || !name || !email || !phone){
            throw new error('All fields are required',400);
        }
        const task= new Task({
            title:title,
            description:description,
            createadby:
            {
                id:user?._id,
                name:user?.fullname?.firstName + ' ' + user?.fullname?.lastName,
                email:user?.contact_Details?.email,
                phone:user?.contact_Details?.phone,
            },
            assign_to:{
                id:id,
                name:name,
                email:email,
                phone:phone,
            },
            dueDate:dueDate,
        });

        const save= await task.save();
        if(!save){
            throw new error('failed to create Task',500);
        }
        const respone = new ResponseData(save,201,'Task created successfully');

        ResponseHandler(res,respone,201);

    }
    catch(error){
        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

    ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
    }
});



export default CreateTak