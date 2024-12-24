import RequestHandler from "../../../utlis/request/requestHandler";
import complexion from "../../models/complexion.model";
import error from "../../../utlis/error/Error";
import ResponseData from "../../../utlis/response/responseData";
import ResponseHandler from "../../../utlis/response/responseHandler";
import { NextFunction, Request, Response } from "express";


const delcomplexion=RequestHandler(async(req:Request,res:Response , next:NextFunction)=>{


    try {
        const {_id}=req.query;

        if(!_id){

            throw new error('Invalid Request',400)
        }

        const delBody= await complexion.findByIdAndDelete(_id);

        if(!delBody){
            throw new error("Failed To Delete complexion",500)
        }

       const response= new ResponseData(delBody,200,'complexion Deleted Successfully');

       ResponseHandler(res,response,200)

    } catch (error) {

        console.error(error)
        
    }
})





export default delcomplexion