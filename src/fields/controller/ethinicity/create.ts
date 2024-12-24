import RequestHandler from "../../../utlis/request/requestHandler";
import error from "../../../utlis/error/Error";
import ResponseData from "../../../utlis/response/responseData";
import ResponseHandler from "../../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import ethinicity from "../../models/ethinicity.model";


export const CreateReligion=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {religion}=req.body;
        if(!religion){
            throw new error('Please Provide Data to create',400)
        }

        const newType= new ethinicity({
            religion
        });
        const save= await newType.save();
        if(!save){
            throw new error(`Failed to create Religion ${religion}`,500);
        }

        const response= new ResponseData(save,201,` Religion ${religion} created successfully`);

        ResponseHandler(res,response,201)
        
    } catch (error) {

        console.error(error)
        
    }
})

export  const CreateCaste=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {religion,caste}=req.body;
        if(!religion || !caste){
            throw new error('Please Provide Data to create',400)
        }

        const newType= await ethinicity.findOneAndUpdate({
            religion,
        },{
            caste
        });
        if(!newType){
            throw new error(`Failed to create Caste ${caste}`,500);
        }

        const response= new ResponseData(newType,201,` Caste ${caste} created successfully`);

        ResponseHandler(res,response,201)
        
    } catch (error) {

        console.error(error)
        
    }
})

export  const CreateGotra=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {religion,caste,gotra}=req.body;
        if(!religion || !caste || !gotra){
            throw new error('Please Provide Data to create',400)
        }

        const newType= await ethinicity.findOneAndUpdate({
            religion,
            caste
        },{
            gotra
        });
        if(!newType){
            throw new error(`Failed to create Gotra ${gotra}`,500);
        }

        const response= new ResponseData(newType,201,` Gotra ${gotra} created successfully`);

        ResponseHandler(res,response,201)
        
    } catch (error) {

        console.error(error)
        
    }
})



