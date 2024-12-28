import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import religion from "../../models/religion.model";
import caste from "../../models/caste.model";
import gotra from "../../models/gotra.model";
export const updateregilion=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {

        const {_id}=req.query;
        const {religion:data}=req.body;

        if(!_id){
            throw new error("Invaild request",400);
        }
        
        const update=await religion.findById(_id);

        if (!update) {
            throw new error("Failed to Update religion",404);
        }
        update.religion=data;
        const  save=await update.save()

        if(!save){
            throw new error("Failed to Update religion",500);

        }

        const response= new ResponseData(update,200,"religion update successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
    }
})




export const updatecaste=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {

        const {_id}=req.query;
        const {caste:data}=req.body;

        if(!_id){
            throw new error("Invaild request",400);
        }
        
        const update=await caste.findById(_id);

        if (!update) {
            throw new error("Failed to Update caste",404);
        }
        update.caste=data;
        const  save=await update.save()

        if(!save){
            throw new error("Failed to Update caste",500);

        }

        const response= new ResponseData(update,200,"caste update successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
        
    }
})

export const updategotra=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {

        const {_id}=req.query;
        const {gotra:data}=req.body;

        if(!_id){
            throw new error("Invaild request",400);
        }
       
        const update=await gotra.findById(_id);

        if (!update) {
            throw new error("Failed to Update gotra",404);
        }
        update.gotra=data;
        const  save=await update.save()

        if(!save){
            throw new error("Failed to Update gotra",500);

        }

        const response= new ResponseData(update,200,"gotra update successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
    }
})

