import error from "../utlis/error/Error";
import RequestHandler from "../utlis/request/requestHandler";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import client from "../models/client.model";
import { Request, Response, NextFunction } from 'express'

const FindClient = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new error('id is required', 400)
        }
        const Client = await client.findById(id);
        if (!Client) {
            throw new error('client not found', 404)
        }
        const response = new ResponseData(Client, 200, 'client found');
        ResponseHandler(res, response, 200);
    }
    catch (err) {
        console.error(err);
        const response = new ResponseData(err, (err as any).statusCode || (err as any).status || 500, (err as any).message);
        ResponseHandler(res, response, (err as any).statusCode || (err as any).status || 500)
    }
})


export default FindClient;