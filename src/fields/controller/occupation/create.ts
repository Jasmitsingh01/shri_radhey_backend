import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import occupation from "../../models/occupation";


const CreateOccupation=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {occupation:occupation_data}=req.body;
        if(!occupation_data){
            throw new error('Please Provide Data to create',400)
        }


        const newType= new occupation({
            occupation:occupation_data
        });
        const save= await newType.save();
        if(!save){
            throw new error('Failed to create occupation',500);
        }

        const response= new ResponseData(save,201,"occupation created successfully");

        ResponseHandler(res,response,201)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).status,(error as any).message);

        ResponseHandler(res,response,(error as any).status)
        
    }
})





export default CreateOccupation