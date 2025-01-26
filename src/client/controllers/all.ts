import error from "../utlis/error/Error";
import RequestHandler from "../utlis/request/requestHandler";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import client from "../models/client.model";
import { Request, Response, NextFunction } from 'express'

const ALLclient = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page = '0', limit = '10' } = req.query;
        const skip = parseInt(page as string) * parseInt(limit as string);
        const clientUers = await client.find().sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit as string)).exec();
        if (clientUers.length <= 0) {
            throw new error('No client Found', 404);

        }
        const response = new ResponseData(clientUers, 200, 'All client Found Successfuly');

        ResponseHandler(res, response, 200);
    }
    catch (error) {
        console.error(error)
        const response = new ResponseData(error, (error as any).statusCode || (error as any).status || 500, (error as any).message);

        ResponseHandler(res, response, (error as any).statusCode || (error as any).status || 500)
    }
})


export default ALLclient;