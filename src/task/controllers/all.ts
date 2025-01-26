import error from "../utlis/error/Error";
import RequestHandler from "../utlis/request/requestHandler";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import Task from "../models/task.model";
import { Request, Response, NextFunction } from 'express'
import mongoose from "mongoose";

const ALLTASK = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req;
        const { page = '0', limit = '10' } = req.query;
        const skip = parseInt(page as string) * parseInt(limit as string);
        const id = new mongoose.Types.ObjectId(user._id);
        const TASK = await Task.find({
            $or:[
                {
                    "createadby.id": id
                },
                {
                    "assign_to.id":id
                }
            ]
        }) .sort({createdAt:-1}).skip(skip).limit(parseInt(limit as string)).exec() ;
        if (TASK.length <= 0) {
            throw new error('No Task Found', 404);

        }
        const response = new ResponseData(TASK, 200, 'All Task Found Successfuly');

        ResponseHandler(res, response, 200);
    }
    catch (error) {
        console.error(error)
        const response = new ResponseData(error, (error as any).statusCode || (error as any).status || 500, (error as any).message);

        ResponseHandler(res, response, (error as any).statusCode || (error as any).status || 500)
    }
})


export default ALLTASK;