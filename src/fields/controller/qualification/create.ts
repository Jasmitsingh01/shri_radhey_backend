import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import qualification from "../../models/qualification.model";


const CreateQualification=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {qualification:qualification_data}=req.body;
        if(!qualification_data){
            throw new error('Please Provide Data to create',400)
        }

        const newType= new qualification({
            qualification:qualification_data
        });
        const save= await newType.save();
        if(!save){
            throw new error('Failed to create qualification',500);
        }

        const response= new ResponseData(save,201,"qualification created successfully");

        ResponseHandler(res,response,201)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).status,(error as any).message);

        ResponseHandler(res,response,(error as any).status)
        
    }
})





export default CreateQualification