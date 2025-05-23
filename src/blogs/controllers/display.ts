import RequestHandler from "../utlis/request/requestHandler";
import blog from "../models/blogs.model";
import error from "../utlis/error/Error";

import { Request,Response,NextFunction} from 'express'
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";




const DisplayBlogs=RequestHandler(async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {id}=req.params;
        if(!id){
            throw new error('Invalid Request',400)
        }
        const Blog= await blog.findById(id);
        if(!Blog){
            throw new error("No Bolg found",404);
        }

        const  response= new ResponseData(Blog,200,"Blog Found successfully");

        ResponseHandler(res,response,200)

        
    } catch (error) {
        console.error(error)
        const response = new ResponseData(error, (error as any).statusCode || (error as any).status || 500, (error as any).message);

      ResponseHandler(res, response, (error as any).statusCode || (error as any).status || 500)
    }
})

export default DisplayBlogs;