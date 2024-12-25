import RequestHandler from "../utlis/request/requestHandler";
import blog from "../models/blogs.model";
import error from "../utlis/error/Error";

import { Request,Response,NextFunction} from 'express'
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";


const createBlogs=RequestHandler(async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const { title, description,keywords , content}=req.body;

        if(!title || !description || !keywords || !content){
            throw new error('Some fields are missing',400)
        }
        const {user}=req

        const newBlog= new blog({
            title,
            description,
            content,
            keywords,
            created_by:user._id
        });
        const save = await newBlog.save();

        if(!save){
            throw new error("Failed to Create blog",500);
        }

        const response= new ResponseData(save,201,"Blog created successfully");

        ResponseHandler(res, response, 201);
        
    } catch (error) {
        console.error(error)
        
    }
})

export default createBlogs;