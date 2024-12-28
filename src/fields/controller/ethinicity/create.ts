import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import religion from "../../models/religion.model";
import caste from "../../models/caste.model";
import gotra from "../../models/gotra.model";

export const CreateReligion=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {ethinicity:{religion:data}}=req.body;
        console.log(req.body ,data)
        if(!data){
            throw new error('Please Provide Data to create',400)
        }

        const newType= new religion({
            religion:data
        });
        const save= await newType.save();
        if(!save){
            throw new error(`Failed to create Religion ${data}`,500);
        }

        const response= new ResponseData(save,201,` Religion ${data} created successfully`);

        ResponseHandler(res,response,201)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
        
    }
})

export  const CreateCaste=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {ethinicity:{religion,caste:data}}=req.body;
    
        if(!religion || !data){
            throw new error('Please Provide Data to create',400)
        }

        const newType= new caste({
            caste:data,
            religion:religion
        });
        const save= await newType.save()
        if(!save){
            throw new error(`Failed to create Caste ${save}`,500);
        }

        const response= new ResponseData(save,201,` Caste ${save} created successfully`);

        ResponseHandler(res,response,201)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
        
    }
})

export  const CreateGotra=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {ethinicity:{religion,caste,gotra:data}}=req.body;
        if(!religion || !caste || !data){
            throw new error('Please Provide Data to create',400)
        }

        const newType= new gotra({
            caste,
            religion,
            gotra:data
        })

        const save=await newType.save()
        if(!save){
            throw new error(`Failed to create Gotra ${data}`,500);
        }

        const response= new ResponseData(save,201,` Gotra ${data} created successfully`);

        ResponseHandler(res,response,201)
        
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
        
    }
})



