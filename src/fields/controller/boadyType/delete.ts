import RequestHandler from "../../utlis/request/requestHandler";
import bodyType from "../../models/bodyType.model";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";


const delBodyType=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {_id}=req.query;

        if(!_id){

            throw new error('Invalid Request',400)
        }

        const delBody= await bodyType.findByIdAndDelete(_id);

        if(!delBody){
            throw new error("Failed To Delete Body type",500)
        }

       const response= new ResponseData(delBody,200,'Body type Deleted Successfully');

       ResponseHandler(res,response,200)

    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).status,(error as any).message);

        ResponseHandler(res,response,(error as any).status)
    }
})





export default delBodyType