import RequestHandler from "../../../utlis/request/requestHandler";
import bodyType from "../../models/bodyType.model";
import error from "../../../utlis/error/Error";
import ResponseData from "../../../utlis/response/responseData";
import ResponseHandler from "../../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";


const Allbodytype=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const All= await bodyType.find();

        if(All.length<=0){
            throw new error('No bodyType is found',404);
        }
        const response= new ResponseData(All,200,"BodyType Found Successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        
    }
})





export default Allbodytype