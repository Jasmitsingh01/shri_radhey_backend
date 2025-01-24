import RequestHandler from "../utlis/request/requestHandler";
import blog from "../models/blogs.model";
import error from "../utlis/error/Error";
import fs from 'fs'
import { Request,Response,NextFunction} from 'express'
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import UploadImageOnline from "../utlis/cloudnairy";



const updateBlogs=RequestHandler(async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const Data=req.body;
        const {id}=req.query;
        const file=req.file
        
        if(!id){
            throw new error('Invalid Request',403);
        };
        if(!Data){
            throw new error("Please Provide Field to Update",400)
        };
        
       const updateBLog= await blog.findOne({
        _id:id,
        created_by:req.user?._id
       });

       if(!updateBLog){
        throw new error("Failed to update Blog",500);

       }
       updateBLog.title=Data?.blog?.title;
       updateBLog.description=Data?.blog?.description;
       updateBLog.keywords=Data?.blog?.keyword;
       updateBLog.content=Data?.content;
       if(file){
        const ImageUrl=await UploadImageOnline(file?.path || "")
        if (ImageUrl) {
            
            updateBLog.thumbnails.url = ImageUrl;
            updateBLog.thumbnails.path=file.path
        }
       }
      const Save=await updateBLog.save({
        validateBeforeSave:false
      });
      if(!Save){
        throw new error("Failed to update Blog",500);

      }
       const  response=new ResponseData(Save,200,'Blog are updated Successfully');

       ResponseHandler(res,response,200)




    } catch (error) {
        console.error(error)
        const response = new ResponseData(error, (error as any).statusCode || (error as any).status || 500, (error as any).message);

      ResponseHandler(res, response, (error as any).statusCode || (error as any).status || 500)
        
    }
})

export default updateBlogs;