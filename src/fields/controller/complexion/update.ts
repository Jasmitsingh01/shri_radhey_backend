import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import complexion from "../../models/complexion.model";


const updateComplexion=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {

        const {_id}=req.query;
        const {complexion:complexion_type}=req.body;

        if(!_id){
            throw new error("Invaild request",400);
        }
        if(!complexion_type){
            throw new error('Please Provide Data to update',400)
        }
        const update=await complexion.findByIdAndUpdate(_id,{
              complexion:complexion_type
        });

        if (!update) {
            throw new error("Failed to Update complexion",500);
        }

        const response= new ResponseData(update,200,"complexion update successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        
    }
})





export default updateComplexion