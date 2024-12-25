import RequestHandler from "../../utlis/request/requestHandler";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";
import occupation from "../../models/occupation";


const deloccupation=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {_id}=req.query;

        if(!_id){

            throw new error('Invalid Request',400)
        }

        const delBody= await occupation.findByIdAndDelete(_id);

        if(!delBody){
            throw new error("Failed To Delete occupation",500)
        }

       const response= new ResponseData(delBody,200,'occupation Deleted Successfully');

       ResponseHandler(res,response,200)

    } catch (error) {

        console.error(error)
        
    }
})





export default deloccupation