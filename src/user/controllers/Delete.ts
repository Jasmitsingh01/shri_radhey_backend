import EmpolyeeUser from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import RequestHandler from "../utlis/request/requestHandler";
import error from "../utlis/error/Error";
import { validationResult } from "express-validator";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";


const Userdelete = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const id = req.query.id;
        const delte = await EmpolyeeUser.findByIdAndDelete(id)
        if (!delte) {
            throw new error("Failed to Delete Empolyee", 500);


        }

        const response = new ResponseData(delte, 200, 'Empolyee Delete Successfully');
        ResponseHandler(res, response, 200)
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)

    }
})


export default Userdelete