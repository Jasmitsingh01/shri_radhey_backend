import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import religion from "../../models/religion.model";
import caste from "../../models/caste.model";
import gotra from "../../models/gotra.model";


export const delreligion=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {_id}=req.query;

        if(!_id){

            throw new error('Invalid Request',400)
        }

        const delBody= await religion.findByIdAndDelete(_id);
        const delcaste= await caste.deleteMany({
            religion:_id
        })
        const delgotra= await gotra.deleteMany({
            religion:_id
        })
        if(!delcaste){
            throw new error("Failed To Delete ethinicity",500)
        }
        if(!delgotra){
            throw new error("Failed To Delete ethinicity",500)
        }

        if(!delBody){
            throw new error("Failed To Delete ethinicity",500)
        }

       const response= new ResponseData(delBody,200,'ethinicity Deleted Successfully');

       ResponseHandler(res,response,200)

    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
        
    }
})

export const delcaste=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {_id}=req.query;

        if(!_id){

            throw new error('Invalid Request',400)
        }

        const delBody= await caste.findByIdAndDelete(_id);
        const delgotra= await gotra.deleteMany({
            caste:_id
        })
        if(!delgotra){
            throw new error("Failed To Delete ethinicity",500)
        }
        if(!delBody){
            throw new error("Failed To Delete ethinicity",500)
        }

       const response= new ResponseData(delBody,200,'ethinicity Deleted Successfully');

       ResponseHandler(res,response,200)

    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
        
    }
})

export const delgotra=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {_id}=req.query;

        if(!_id){

            throw new error('Invalid Request',400)
        }

        const delBody= await gotra.findByIdAndDelete(_id);

        if(!delBody){
            throw new error("Failed To Delete ethinicity",500)
        }

       const response= new ResponseData(delBody,200,'ethinicity Deleted Successfully');

       ResponseHandler(res,response,200)

    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
        
    }
})

