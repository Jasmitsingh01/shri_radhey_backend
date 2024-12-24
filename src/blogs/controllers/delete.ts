import RequestHandler from "../../utlis/request/requestHandler";
import blog from "../models/blogs.model";
import error from "../../utlis/error/Error";

import { Request,Response,NextFunction} from 'express'
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";



const DelBlogs=RequestHandler(async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const id=req.query.id;
        if(!id){
            throw new error("Invaild Request",400)
        }
        const delBolg= await blog.findByIdAndDelete(id);
        if(!delBolg){
            throw new error("Failed to Delete Blog",500)
        }

        const response=new ResponseData({
            event:true
        }, 200,'Blog deleted Successfully');

        ResponseHandler(res,response,200)
        
    } catch (error) {
        console.error(error)
        
    }
})

export default DelBlogs;