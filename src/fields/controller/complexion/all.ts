import RequestHandler from "../../../utlis/request/requestHandler";
import error from "../../../utlis/error/Error";
import ResponseData from "../../../utlis/response/responseData";
import ResponseHandler from "../../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import complexion from "../../models/complexion.model";


const AllComplexion=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const All= await complexion.find();

        if(All.length<=0){
            throw new error('No complexion is found',404);
        }
        const response= new ResponseData(All,200,"complexion Found Successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        
    }
})





export default AllComplexion