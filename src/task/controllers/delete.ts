import RequestHandler from "../../utlis/request/requestHandler";
import { Request,Response,NextFunction } from "express";
import Task from "../models/task.model";
import error from "../../utlis/error/Error";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";


const Deltask=RequestHandler(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const id=req.query._id
        
        const Del= await Task.findByIdAndDelete(id);
        if(!Del){
            throw new error(' failed to Delete task',500);
        }
        const response= new ResponseData(null,200,'Task Deleted Successfuly');
        ResponseHandler(res,response,200)
    } catch (error) {
        console.error(error);
    }
})

export default Deltask;