import RequestHandler from "../../../utlis/request/requestHandler";
import ResponseData from "../../../utlis/response/responseData";
import ResponseHandler from "../../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import error from "../../../utlis/error/Error";
import ethinicity from "../../models/ethinicity.model";



const Allethinicity= RequestHandler(async(req:Request,res:Response,next:NextFunction)=>{

    try {
    const Ethinicity= await ethinicity.find();

    if(Ethinicity.length<=0){
        throw new error('No Ethinicity is Found',401)
    }
    

    const response=new ResponseData(Ethinicity,200,'All Ethinicity Found');

    ResponseHandler(res,response,200)

    } catch (error) {
        console.error(error)
    }
});


export default Allethinicity;