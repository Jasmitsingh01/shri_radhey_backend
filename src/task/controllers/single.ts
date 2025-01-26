import error from "../utlis/error/Error";
import RequestHandler from "../utlis/request/requestHandler";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import Task from "../models/task.model";
import { Request, Response, NextFunction } from 'express'

const SingleTask = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query;
        if (!id) {
            throw new error('invalid request', 400)
        }
        const findTask = await Task.findOne({
            $or: [
                {
                    _id: id
                },
                {
                    "createadby.id": req?.user?._id
                }, {
                    "assign_to.id": req?.user?._id
                }

            ]
        });
        if (!findTask) {
            throw new error('No Task were Found', 402)
        }
        findTask.viewed = true;
        const save = await findTask.save({ validateBeforeSave: false });
        if (!save) {
            throw new error('Something went Wrong', 500)
        }
        const respose = new ResponseData(save, 200, "Task Found ");
        ResponseHandler(res, respose, 200)
    } catch (error) {
        console.error(error)
        const response = new ResponseData(error, (error as any).statusCode || (error as any).status || 500, (error as any).message);

        ResponseHandler(res, response, (error as any).statusCode || (error as any).status || 500)
    }
})

export default SingleTask