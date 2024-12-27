import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import location from "../../models/location.model";



export const updatecountry=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {

        const {_id}=req.query;
        const {country}=req.body;

        if(!_id){
            throw new error("Invaild request",400);
        }
        
        const update=await location.findByIdAndUpdate(_id,{
            country
        });

        if (!update) {
            throw new error("Failed to Update country",500);
        }

        const response= new ResponseData(update,200,"country update successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        
    }
})




export const updatestate=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {

        const {_id}=req.query;
        const {state}=req.body;

        if(!_id){
            throw new error("Invaild request",400);
        }
        
        const update=await location.findByIdAndUpdate(_id,{
              state
        });

        if (!update) {
            throw new error("Failed to Update state",500);
        }

        const response= new ResponseData(update,200,"state update successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).status,(error as any).message);

        ResponseHandler(res,response,(error as any).status)
        
    }
})

export const updatecity=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {

        const {_id}=req.query;
        const {city}=req.body;

        if(!_id){
            throw new error("Invaild request",400);
        }
       
        const update=await location.findByIdAndUpdate(_id,{
              city
        });

        if (!update) {
            throw new error("Failed to Update city",500);
        }

        const response= new ResponseData(update,200,"city update successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).status,(error as any).message);

        ResponseHandler(res,response,(error as any).status)
        
    }
})

