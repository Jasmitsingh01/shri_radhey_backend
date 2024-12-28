import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import qualification from "../../models/qualification.model";


const Allqualification=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const All= await qualification.find();

        if(All.length<=0){
            throw new error('No qualification is found',404);
        }
        const response= new ResponseData(All,200,"Qualification Found Successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
        
    }
})





export default Allqualification