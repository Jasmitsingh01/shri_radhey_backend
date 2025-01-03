import RequestHandler from "../utlis/request/requestHandler";
import { Request,Response,NextFunction } from "express";
import Task from "../models/task.model";
import error from "../utlis/error/Error";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";


const Deltask=RequestHandler(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const id=req.query.id

        if(!id){
            throw new error('Task Id is required',400);
        }
        
        const Del= await Task.deleteOne({
            $and:[
                {
                    _id:id
                },
                {
                    "createadby.id":req.user?._id
                }
            ]
        });
        if(!Del){
            throw new error(' failed to Delete task',500);
        }
        const response= new ResponseData(null,200,'Task Deleted Successfuly');
        ResponseHandler(res,response,200)
    } catch (error) {
        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

    ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
    }
})

export default Deltask;