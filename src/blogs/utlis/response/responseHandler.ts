import { Response } from 'express';
import ResponseData from './responseData';
function ResponseHandler(res: Response, data?: ResponseData, status: number = 200) {
    res.status(status).send(data);
}
export default ResponseHandler;
