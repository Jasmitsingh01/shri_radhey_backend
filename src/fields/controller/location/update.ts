import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import country from "../../models/country.model";
import state from "../../models/state.model";
import city from "../../models/city.model";

export const updatecountry=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {

        const {_id}=req.query;
        const { country:data}=req.body;



        if(!_id){
            throw new error("Invaild request",400);
        }
        
        const update=await country.findById(_id);

        if (!update) {
            throw new error("Failed to Update country",500);
        }
      update.country=data;
      const save= await update.save();
      if (!save) {
        throw new error("Failed to Update state",500);
    }
        const response= new ResponseData(update,200,"country update successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
        
        
    }
})

export const updatestate=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {

        const {_id}=req.query;
        const {state:data}=req.body;

        if(!_id){
            throw new error("Invaild request",400);
        }
        
        const update=await state.findById(_id);

        if (!update) {
            throw new error("Failed to Update state",500);
        }
        update.state=data;
        const save= await update.save();
        if (!save) {
            throw new error("Failed to Update state",500);
        }
        const response= new ResponseData(update,200,"state update successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).status,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
        
    }
})

export const updatecity=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {

        const {_id}=req.query;
        const {city:data}=req.body;
        if(!_id){
            throw new error("Invaild request",400);
        }
       
        const update=await city.findById(_id);

        if (!update) {
            throw new error("Failed to Update city",500);
        }
        update.city=data;
        const save= await update.save();
        if (!save) {
            throw new error("Failed to Update state",500);
        }
        const response= new ResponseData(update,200,"city update successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
        
    }
})

