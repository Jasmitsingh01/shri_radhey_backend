import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import country from "../../models/country.model";
import state from "../../models/state.model";

import city from "../../models/city.model";

export const Allcountry= RequestHandler(async(req:Request,res:Response,next:NextFunction)=>{

    try {
    const Location= await country.find();

    if(Location.length<=0){
        throw new error('No Location is Found',401)
    }
    

    const response=new ResponseData(Location,200,'All Location Found');

    ResponseHandler(res,response,200)

    } catch (error) {
        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
    }
});

export const Allstate= RequestHandler(async(req:Request,res:Response,next:NextFunction)=>{

    try {
    const Location= await state.find();

    if(Location.length<=0){
        throw new error('No Sate is Found',401)
    }
    

    const response=new ResponseData(Location,200,'All Sate Found');

    ResponseHandler(res,response,200)

    } catch (error) {
        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
    }
});


export const Allcity= RequestHandler(async(req:Request,res:Response,next:NextFunction)=>{

    try {
    const Location= await city.find();

    if(Location.length<=0){
        throw new error('No City is Found',401)
    }
    

    const response=new ResponseData(Location,200,'All City Found');

    ResponseHandler(res,response,200)

    } catch (error) {
        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
    }
});