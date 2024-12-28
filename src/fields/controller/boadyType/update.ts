import RequestHandler from "../../utlis/request/requestHandler";
import bodyType from "../../models/bodyType.model";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";



const updatebodytype=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {

        const {_id}=req.query;
        const {bodytype}=req.body;

        if(!_id){
            throw new error("Invaild request",400);
        }
        if(!bodytype){
            throw new error('Please Provide Data to update',400)
        }
        const id =new mongoose.Types.ObjectId(`${_id}`)
        const update=await bodyType.findById(id)
    

        if (!update) {
            throw new error("Failed to Update Body Type",500);
         }
           update.body_type=bodytype;
           const save=await update.save();
           if(!save){
            throw new error("Failed to Update Body Type",500);
           }
        const response= new ResponseData(update,200,"Body type update successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
        
    }
})





export default updatebodytype