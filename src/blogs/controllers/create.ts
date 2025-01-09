import RequestHandler from "../utlis/request/requestHandler";
import blog from "../models/blogs.model";
import error from "../utlis/error/Error";

import { Request,Response,NextFunction} from 'express'
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import UploadImageOnline from "../utlis/cloudnairy";


const createBlogs=RequestHandler(async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const { blog:{title, description,keyword} , content}=req.body;
        if(!title || !description || !keyword || !content){
            throw new error('Some fields are missing',400)
        }
        const {user, file}=req

        if(!file){
            throw  new error('Failed to Upload File',500)
        }
        const ImageUrl= await UploadImageOnline(file?.path || "");
        if(!ImageUrl){
            throw new error('Failed to Upload File',500)

        }
        const newBlog= new blog({
            title,
            description,
            content,
            thumbnails:{
                url:ImageUrl,
                path:file?.path
            },
            keywords:keyword,
            created_by:user._id
        });
        const save = await newBlog.save();

        if(!save){
            throw new error("Failed to Create blog",500);
        }

        const response= new ResponseData(save,201,"Blog created successfully");

        ResponseHandler(res, response, 201);
        
    } catch (error) {
        console.error(error);
        const response = new ResponseData(error, (error as any).statusCode || (error as any).status || 500, (error as any).message);

      ResponseHandler(res, response, (error as any).statusCode || (error as any).status || 500)
        
    }
})

export default createBlogs;