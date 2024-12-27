import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
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
        const response= new ResponseData(error,(error as any).status,(error as any).message);

        ResponseHandler(res,response,(error as any).status)
    }
});


export default Allethinicity;