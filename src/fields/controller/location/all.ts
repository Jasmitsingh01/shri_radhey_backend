import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import location from "../../models/location.model";



const Alllocation= RequestHandler(async(req:Request,res:Response,next:NextFunction)=>{

    try {
    const Location= await location.find();

    if(Location.length<=0){
        throw new error('No Location is Found',401)
    }
    

    const response=new ResponseData(Location,200,'All Location Found');

    ResponseHandler(res,response,200)

    } catch (error) {
        console.error(error)
        const response= new ResponseData(error,(error as any).status,(error as any).message);

        ResponseHandler(res,response,(error as any).status)
    }
});


export default Alllocation;