import EmpolyeeUser from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import RequestHandler from "../utlis/request/requestHandler";
import error from "../utlis/error/Error";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import sendmail from "../utlis/mailing/sendmail";



const ResendCode=RequestHandler(async (req:Request,res:Response,next:NextFunction)=>{
   try {

    const {email}=req.body
    if(!email){
        throw new error('Invaild Request',400)
      }
      const otp = Math.floor(1000 + Math.random() * 9000).toString();

      const Resend=await EmpolyeeUser.findOne({
        contact_Details:{
            email:email
        }
      });
      if(!Resend){
        throw new error('No User Found',500)
      }
      Resend.empoylee_deatils.code_email=otp;

      const Save= await Resend.save({validateBeforeSave:false});
      if(!Save){
        throw new error("Failed Send Code ",500)
      }
      sendmail(Resend.contact_Details.email,"Verification Code ",otp);

      const response=new ResponseData('',200,"Code send to your mail successfully");
      ResponseHandler(res,response,200)
    
   } catch (error) {
    console.error(error)
    const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

    ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
   }

})

export default ResendCode