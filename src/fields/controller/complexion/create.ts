import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import complexion from "../../models/complexion.model";

const CreateComplexion=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {complexion:complexion_data}=req.body;
        if(!complexion_data){
            throw new error('Please Provide Data to create',400)
        }

        const newType= new complexion({
            complexion:complexion_data
        });
        const save= await newType.save();
        if(!save){
            throw new error('Failed to create complexion',500);
        }

        const response= new ResponseData(save,201,"complexion created successfully");

        ResponseHandler(res,response,201)
        
    } catch (error) {

        console.error(error)
        
    }
})





export default CreateComplexion