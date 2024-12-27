import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import location from "../../models/location.model";


export const CreateCountry=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {country}=req.body;
        if(!country){
            throw new error('Please Provide Data to create',400)
        }

        const newType= new location({
            country
        });
        const save= await newType.save();
        if(!save){
            throw new error(`Failed to create country ${country}`,500);
        }

        const response= new ResponseData(save,201,` country ${country} created successfully`);

        ResponseHandler(res,response,201)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).status,(error as any).message);

        ResponseHandler(res,response,(error as any).status)
        
    }
})

export  const Createstate=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {country,state}=req.body;
        if(!country || ! state){
            throw new error('Please Provide Data to create',400)
        }

        const newType= await location.findOneAndUpdate({
            country,
        },{
            state
        });
        if(!newType){
            throw new error(`Failed to create state ${state}`,500);
        }

        const response= new ResponseData(newType,201,` state ${state} created successfully`);

        ResponseHandler(res,response,201)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).status,(error as any).message);

        ResponseHandler(res,response,(error as any).status)
        
    }
})

export  const Createcity=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {country,state,city}=req.body;
        if(!country || !state || !city){
            throw new error('Please Provide Data to create',400)
        }

        const newType= await location.findOneAndUpdate({
            country,
            state
        },{
            city
        });
        if(!newType){
            throw new error(`Failed to create city ${city}`,500);
        }

        const response= new ResponseData(newType,201,` city ${city} created successfully`);

        ResponseHandler(res,response,201)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).status,(error as any).message);

        ResponseHandler(res,response,(error as any).status)
        
    }
})
