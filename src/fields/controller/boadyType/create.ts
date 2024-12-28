import RequestHandler from "../../utlis/request/requestHandler";
import bodyType from "../../models/bodyType.model";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";



const CreateBodytype=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {bodytype}=req.body;
        if(!bodytype){
            throw new error('Please Provide Data to create',400)
        }

        const newType= new bodyType({
            body_type:bodytype
        });
        const save= await newType.save();
        if(!save){
            throw new error('Failed to create Body Type',500);
        }

        const response= new ResponseData(save,201,"Body Type created successfully");

        ResponseHandler(res,response,201)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
    }
})





export default CreateBodytype