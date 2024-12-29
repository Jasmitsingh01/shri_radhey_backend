import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import country from "../../models/country.model";
import state from "../../models/state.model";
import city from "../../models/city.model";
export const delcountry=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {_id}=req.query;

        if(!_id){

            throw new error('Invalid Request',400)
        }

        const delBody= await country.findByIdAndDelete(_id);
        const delstate= await state.deleteMany({
            country:_id
        });
        const  delcity= await city.deleteMany({
            country:_id
        })
      if(!delstate){
        throw new error("Failed To Delete location",500)
      }
      if(!delcity){
        throw new error("Failed To Delete location",500)
      }
        if(!delBody){
            throw new error("Failed To Delete location",500)
        }
 
       const response= new ResponseData(delBody,200,'location Deleted Successfully');

       ResponseHandler(res,response,200)

    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
        
    }
})


export  const delstate=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {_id}=req.query;

        if(!_id){

            throw new error('Invalid Request',400)
        }

        const delBody= await state.findByIdAndDelete(_id);
        const delcity=await city.deleteMany({
            state:_id
        })
        if(!delcity){
            throw new error("Failed To Delete location",500)
          }
        if(!delBody){
            throw new error("Failed To Delete location",500)
        }

       const response= new ResponseData(delBody,200,'location Deleted Successfully');

       ResponseHandler(res,response,200)

    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
        
    }
})

export const delcity=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {_id}=req.query;

        if(!_id){

            throw new error('Invalid Request',400)
        }

        const delBody= await city.findByIdAndDelete(_id);

        if(!delBody){
            throw new error("Failed To Delete location",500)
        }

       const response= new ResponseData(delBody,200,'location Deleted Successfully');

       ResponseHandler(res,response,200)

    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
        
    }
})
