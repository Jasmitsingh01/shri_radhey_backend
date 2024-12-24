import { body } from 'express-validator';
import RequestHandler from "../../../utlis/request/requestHandler";
import error from "../../../utlis/error/Error";
import ResponseData from "../../../utlis/response/responseData";
import ResponseHandler from "../../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import occupation from '../../models/occupation';


const updateoccupation=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {

        const {_id}=req.query;
        const {complexion:occupation_type}=req.body;

        if(!_id){
            throw new error("Invaild request",400);
        }
        if(!occupation_type){
            throw new error('Please Provide Data to update',400)
        }
        const update=await occupation.findByIdAndUpdate(_id,{
              occupation:occupation_type
        });

        if (!update) {
            throw new error("Failed to Update occupation",500);
        }

        const response= new ResponseData(update,200,"occupation update successfully");

        ResponseHandler(res,response,200)
        
    } catch (error) {

        console.error(error)
        
    }
})





export default updateoccupation