import RequestHandler from "../../utlis/request/requestHandler";
import bodyType from "../../models/bodyType.model";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";



const Allbodytype=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {

        const {_id}=req.query;
        const {body_type}=req.body;

        if(!_id){
            throw new error("Invaild request",400);
        }
        if(!body_type){
            throw new error('Please Provide Data to update',400)
        }
        const update=await bodyType.findByIdAndUpdate(_id,{
            body_type:body_type,
        });

        if (!update) {
            throw new error("Failed to Update Body Type",500);
        }

        const response= new ResponseData(update,200,"Body type update successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        
    }
})





export default Allbodytype