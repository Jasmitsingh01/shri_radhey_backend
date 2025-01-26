import RequestHandler from "../utlis/request/requestHandler";
import blog from "../models/blogs.model";
import error from "../utlis/error/Error";
import { Request,Response,NextFunction} from 'express'
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";




const AllBlogs= RequestHandler(async(req:Request,res:Response,next:NextFunction)=>{

    try {
    const {page='0',limit='10'}=req.query;
    const skip=parseInt(page as string) * parseInt(limit as string);

    const blogs= await blog.find().sort({createdAt:-1}).skip(skip).limit(parseInt(limit as string)).exec();
    if(blogs.length<=0){
        throw new error('No Blogs is Found',404)
    }
    

    const response=new ResponseData(blogs,200,'All blogs Found');

    ResponseHandler(res,response,200)

    } catch (error) {
        console.error(error)
        const response = new ResponseData(error, (error as any).statusCode || (error as any).status || 500, (error as any).message);

      ResponseHandler(res, response, (error as any).statusCode || (error as any).status || 500)
    }
});


export default AllBlogs;