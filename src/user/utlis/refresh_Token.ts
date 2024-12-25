import RequestHandler from "../utlis/request/requestHandler";
import { Request, Response } from "express";
import EmpolyeeUser from "../models/user.model";
import setCookies from "../utlis/cookies/setCokkies";

const refresh_Token = RequestHandler(async (req: Request, res: Response) => {
    try {
        const token = req.cookies.refresh_token || req.header('Authorization')?.split('Bearer ')[1];
        if (!token) {
            throw new Error("Token not found");
        }
        const user = await EmpolyeeUser.findOne({ refresh_token: token });
        if (!user) {
            throw new Error("User not found");
        }
        const access_token = user.generateAccessToken();
        const refresh_token = user.generateRefreshToken();
        user.access_token = access_token;
        user.refresh_token = refresh_token;
        const save = await user.save({ validateBeforeSave: false });
        if (!save) {
            throw new Error("Token not saved");
        }
        setCookies(res,  {
            access_token:access_token,
            refresh_token:refresh_token
        });

    }
    catch (err) {
        console.error(err);
    }

});

export default refresh_Token;