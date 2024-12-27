import RequestHandler from "../utlis/request/requestHandler";
import { Request, Response } from "express";
import EmpolyeeUser from "../models/user.model";
import setCookies from "../utlis/cookies/setCokkies";
import jwt from 'jsonwebtoken'
import error from "./error/Error";
import ResponseData from "./response/responseData";
import ResponseHandler from "./response/responseHandler";
const refresh_Token = RequestHandler(async (req: Request, res: Response) => {
    try {
        const token = req.cookies.refresh_token || req.header('Authorization')?.split('Bearer ')[1];
        if (!token) {
            throw new error("Token not found",400);
        }

        const verfiy= jwt.verify(token,process.env.JWT_SECRET_KEY as string);
         if(!verfiy){
            throw new error('Invalid token',402)
         }
        const user = await EmpolyeeUser.findById((verfiy as any)._id);
        if (!user) {
            throw new error("User not found",404);
        }
        const access_token = user.generateAccessToken();
        const refresh_token = user.generateRefreshToken();
        user.access_token = access_token;
        user.refresh_token = refresh_token;
        const save = await user.save({ validateBeforeSave: false });
        if (!save) {
            throw new error("Token not saved",500);
        }
        setCookies(res,  {
            access_token:access_token,
            refresh_token:refresh_token
        });
        const rsp=new ResponseData(null,200,'Access granted')
        ResponseHandler(res,rsp,200)
    }
    catch (err) {
        console.error(err);
        const rsp=new ResponseData(null,(err as any).statusCode,(err as any).message)
        ResponseHandler(res,rsp,(err as any).statusCode)
    }

});

export default refresh_Token;