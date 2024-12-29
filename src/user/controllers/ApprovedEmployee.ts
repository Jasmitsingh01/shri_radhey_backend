import EmpolyeeUser from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import RequestHandler from "../utlis/request/requestHandler";
import error from "../utlis/error/Error";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";


const ApprovedEmp=RequestHandler(async(req:Request,res:Response,next:NextFunction)=>{

     try {
        const {empoylee_deatils:{emp_role},_id}=req.body;
     if(!emp_role || !_id){
       throw new error('Invaild Request',400)
     }
     
      const Approved= await EmpolyeeUser.findByIdAndUpdate(_id,{
        empoylee_deatils:{
            emp_role:emp_role,
            is_approved:true,
        }
      });

      if(!Approved){
        throw new error("Failed to Approved Employee ",500);
      };

      const ApprovedData=new ResponseData(Approved,200,'Successfully Empolyee Approved');
      ResponseHandler(res,ApprovedData,200)

     } catch (error) {
        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
        
     }
})


export default ApprovedEmp