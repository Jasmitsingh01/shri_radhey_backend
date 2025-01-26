import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import religion from "../../models/religion.model";
import caste from "../../models/caste.model";
import gotra from "../../models/gotra.model";


export const Allreligion= RequestHandler(async(req:Request,res:Response,next:NextFunction)=>{

    try {
    const Ethinicity= await religion.find();

    if(Ethinicity.length<=0){
        throw new error('No religion is Found',404)
    }
    

    const response=new ResponseData(Ethinicity,200,'All religion Found');

    ResponseHandler(res,response,200)

    } catch (error) {
        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
    }
});

export const Allcaste=RequestHandler(async(req:Request,res:Response,next:NextFunction)=>{

    try {
    const Ethinicity= await caste.find();

    if(Ethinicity.length<=0){
        throw new error('No religion is Found',404)
    }
    

    const response=new ResponseData(Ethinicity,200,'All religion Found');

    ResponseHandler(res,response,200)

    } catch (error) {
        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
    }
});

export const Allgotra=RequestHandler(async(req:Request,res:Response,next:NextFunction)=>{

    try {
    const Ethinicity= await gotra.find();

    if(Ethinicity.length<=0){
        throw new error('No religion is Found',404)
    }
    

    const response=new ResponseData(Ethinicity,200,'All religion Found');

    ResponseHandler(res,response,200)

    } catch (error) {
        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
    }
});


