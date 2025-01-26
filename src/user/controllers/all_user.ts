import EmpolyeeUser from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import RequestHandler from "../utlis/request/requestHandler";
import error from "../utlis/error/Error";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";


const Userall=RequestHandler( async (req:Request,res:Response,next:NextFunction)=>{

    try {
        const limit=req.query.limit || 10;
        const page=req.query.page || 0;
        const skip=parseInt(page as string)*parseInt(limit as string);
        
        const all=await EmpolyeeUser.find({
            
             _id:{$ne:req.user._id},
           
             "empoylee_deatils.is_approved":true
         
        }).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit as string)).exec()
        if(all.length<=0){
            throw new error("Failed to Fecth Empolyees",404);


        }
        
        const response=new ResponseData(all,200,'All Empolyee Fecth Successfully');
        ResponseHandler(res,response,200)
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
        
    }
})


export default Userall