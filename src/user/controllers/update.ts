import EmpolyeeUser from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import RequestHandler from "../utlis/request/requestHandler";
import error from "../utlis/error/Error";
import { validationResult } from "express-validator";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";


const Userupdate = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const Data = req.body
        const user = req.user;
        const update = await EmpolyeeUser.findByIdAndUpdate(user?._id, {
            ...Data
        })
        if (!update) {
            throw new error("Failed to update Empolyee", 500);


        }

        const response = new ResponseData(update, 200, 'Empolyee Update Successfully');
        ResponseHandler(res, response, 200)
    } catch (error) {

        console.error(error)

    }
})


export default Userupdate