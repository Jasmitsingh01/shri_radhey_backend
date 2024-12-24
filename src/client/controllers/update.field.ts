import error from "../../utlis/error/Error";
import RequestHandler from "../../utlis/request/requestHandler";
import { Request, Response, NextFunction } from "express";
import client from "../models/client.model";
import ResponseHandler from "../../utlis/response/responseHandler";
import ResponseData from "../../utlis/response/responseData";



const updateField = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data = req.body;
        const id = req.query.id
        if (!id) {
            throw new error('Invaild request', 400)
        }
        if (!data) {
            throw new error('Please Provide filed to update', 400)
        }
        const updateClient = await client.findByIdAndUpdate(id, {
            ...data
        })
        if (!updateClient) {
            throw new error('Failed to update Client', 500);
        }

        const response = new ResponseData(updateClient, 202, 'Client Update Successfully');
        ResponseHandler(res, response, 202)
    } catch (error) {
        console.error(error);
    }
});

export default updateField