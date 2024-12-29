import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import country from "../../models/country.model";
import state from "../../models/state.model";
import city from "../../models/city.model";
import mongoose from "mongoose";


export const CreateCountry=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {country:data}=req.body;
        if(!country){
            throw new error('Please Provide Data to create',400)
        }

        const newType= new country({
            country:data
        });
        const save= await newType.save();
        if(!save){
            throw new error(`Failed to create country ${data}`,500);
        }

        const response= new ResponseData(save,201,` country ${data} created successfully`);

        ResponseHandler(res,response,201)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status ,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status)
        
    }
})

export  const Createstate=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {Location:{country,state:data}}=req.body;
        if(!country || ! data){
            throw new error('Please Provide Data to create',400)
        }
      const id=new mongoose.Types.ObjectId(`${country}`)
        const newType= new state({
            country:id,
            state:data
        })
       
       
        const save=await newType.save();
        if(!save){
            throw new error(`Failed to create state ${data}`,500);

        }
        const response= new ResponseData(newType,201,` state ${data} created successfully`);

        ResponseHandler(res,response,201)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
        
    }
})

export  const Createcity=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {Location:{country,state,city:data}}=req.body;
console.log(req.body)
        if(!country || !state || !data){
            throw new error('Please Provide Data to create',400)
        }

        const newType= new city({
            country,
            state,
        
            city:data
        });
        
        const save= newType.save();
        if(!save){
            throw new error('Failed to Create City',500)
        }

        const response= new ResponseData(newType,201,` city ${save} created successfully`);

        ResponseHandler(res,response,201)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).status,(error as any).message);

        ResponseHandler(res,response,(error as any).status)
        
    }
})
