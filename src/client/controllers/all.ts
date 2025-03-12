import error from "../utlis/error/Error"; // Assuming your custom error class is named CustomError
import RequestHandler from "../utlis/request/requestHandler";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import client from "../models/client.model";
import { Request, Response, NextFunction } from 'express';

const ALLclient = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page = '0', limit = '10' } = req.query;
        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);
        const skip = (pageNumber >0 ? pageNumber-1 : pageNumber) * limitNumber;
        const clientUsers = await client.find().sort({ createdAt: -1 }).skip(skip).limit(limitNumber).exec();
        const totalCount = await client.countDocuments();

        if (clientUsers.length === 0) {
            // Option 1: Return an empty array with 200 OK
            const response = new ResponseData({
                clients: clientUsers,
                totalCount: totalCount,
                currentPage: pageNumber,
                totalPages: Math.ceil(totalCount / limitNumber)
            }, 200, 'No clients found on this page.');
            ResponseHandler(res, response, 200);
            //Option 2: if you want to throw a 404 error, use the following code instead of the above.
            //throw new CustomError('No clients found on this page.', 404);
            return;
        }

        const response = new ResponseData({
            clients: clientUsers,
            totalCount: totalCount,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalCount / limitNumber)
        }, 200, 'All clients found successfully.');

        ResponseHandler(res, response, 200);
    } catch (error) {
        console.error(error);
        const customError = error as error; // Use your custom error class
        const statusCode = customError.statusCode || 500;
        const message = customError.message || 'Internal Server Error';

        const response = new ResponseData(message, statusCode, message);
        ResponseHandler(res, response, statusCode);
    }
});

export default ALLclient;