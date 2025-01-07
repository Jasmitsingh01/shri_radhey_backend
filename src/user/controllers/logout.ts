import { NextFunction, Response } from "express";
import { Request } from "express";
import RequestHandler from "../utlis/request/requestHandler";

import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import offline from "../utlis/Setoffline";


const logout = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
       await offline(req?.cookies?.access_token || req.headers.authorization?.split('Bearer ')[1] || "")
        res.clearCookie('access_token')
        res.clearCookie('refresh_token')

        const response = new ResponseData(
            true,200,
            "Logout successfully",
        );
        ResponseHandler(res, response,200);
    } catch (err) {
        console.error(err)
    }
}
)
export default logout;
