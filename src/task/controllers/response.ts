import RequestHandler from "../utlis/request/requestHandler";
import { Request,Response,NextFunction } from "express";
import Task from "../models/task.model";
import error from "../utlis/error/Error";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";

const ResponseTask = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id, data, } = req.body
        const task = await Task.findById(_id);
        if (!task) {
            throw new error('Please select Correct task', 400);
        }
        task.response.data = data;
        task.response.submitted_by = req?.user?._id;
        task.response.submission_date = new Date();
        const save = await task.save();
        if (!save) {
            throw new error('Something went wrong response is not Submitted', 500);

        }
        const response = new ResponseData(save, 202, 'Response Stored Successfully')
        ResponseHandler(res, response, 202);
    } catch (error) {
        console.error(error)
    }

});

export default ResponseTask;