import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import ethinicity from "../../models/ethinicity.model";

export const updateregilion=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {

        const {_id}=req.query;
        const {religion}=req.body;

        if(!_id){
            throw new error("Invaild request",400);
        }
        
        const update=await ethinicity.findByIdAndUpdate(_id,{
            religion
        });

        if (!update) {
            throw new error("Failed to Update religion",500);
        }

        const response= new ResponseData(update,200,"religion update successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        
    }
})




export const updatecaste=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {

        const {_id}=req.query;
        const {caste}=req.body;

        if(!_id){
            throw new error("Invaild request",400);
        }
        
        const update=await ethinicity.findByIdAndUpdate(_id,{
              caste
        });

        if (!update) {
            throw new error("Failed to Update caste",500);
        }

        const response= new ResponseData(update,200,"caste update successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        
    }
})

export const updategotra=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {

        const {_id}=req.query;
        const {gotra}=req.body;

        if(!_id){
            throw new error("Invaild request",400);
        }
       
        const update=await ethinicity.findByIdAndUpdate(_id,{
              gotra
        });

        if (!update) {
            throw new error("Failed to Update gotra",500);
        }

        const response= new ResponseData(update,200,"gotra update successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        
    }
})

