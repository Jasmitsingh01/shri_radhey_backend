import RequestHandler from "../../utlis/request/requestHandler";
import blog from "../models/blogs.model";
import error from "../../utlis/error/Error";

import { Request,Response,NextFunction} from 'express'
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";



const createBlogs=RequestHandler(async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const Data=req.body;
        const {id}=req.query;
        if(!id){
            throw new error('Invalid Request',403);
        };
        if(!Data){
            throw new error("Please Provide Field to Update",400)
        };
        
       const updateBLog= await blog.findByIdAndUpdate(id,{
        ...Data
       });

       if(!updateBLog){
        throw new error("Failed to update Blog",500);

       }

       const  response=new ResponseData(updateBLog,200,'Blog are updated Successfully');

       ResponseHandler(res,response,200)




    } catch (error) {
        console.error(error)
        
    }
})

export default createBlogs;