import RequestHandler from "../utlis/request/requestHandler";
import blog from "../models/blogs.model";
import error from "../utlis/error/Error";

import { Request,Response,NextFunction} from 'express'
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";




const AllBlogs= RequestHandler(async(req:Request,res:Response,next:NextFunction)=>{

    try {
    const {user}=req;        
    const blogs= await blog.find({
        created_by:user._id
    });

    if(blogs.length<=0){
        throw new error('No Blogs is Found',401)
    }
    

    const response=new ResponseData(blogs,200,'All blogs Found');

    ResponseHandler(res,response,200)

    } catch (error) {
        console.error(error)
    }
});


export default AllBlogs;