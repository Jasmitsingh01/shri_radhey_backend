import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import qualification from "../../models/qualification.model";



const updatequalification=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {

        const {_id}=req.query;
        const {qualification:qualification_type}=req.body;

        if(!_id){
            throw new error("Invaild request",400);
        }
        if(!qualification_type){
            throw new error('Please Provide Data to update',400)
        }
        const update=await qualification.findByIdAndUpdate(_id,{
              qualification:qualification_type
        });

        if (!update) {
            throw new error("Failed to Update qualification",500);
        }

        const response= new ResponseData(update,200,"qualification update successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        
    }
})





export default updatequalification      