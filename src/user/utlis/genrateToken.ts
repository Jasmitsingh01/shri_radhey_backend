import EmpolyeeUser from "../models/user.model";
import e, { Request, Response } from "express";
import error from "../utlis/error/Error";
import setCookies from "../utlis/cookies/setCokkies";

const GenrateToken = async (req: Request, res: Response) => {
    try {
        const { _id } = req.user;
        const user = await EmpolyeeUser.findById(_id);
        if (!user) {
            throw new error("User not found", 404);
        }

        const access_token = user.generateAccessToken();
        const refresh_token = user.generateRefreshToken();
        user.access_token = access_token;
        user.refresh_token = refresh_token;
        const save = await user.save({ validateBeforeSave: false });
        if (!save) {
            throw new error("Token not saved", 500);
        }
     setCookies(res,{
        refresh_token:refresh_token,
        access_token:access_token
     })
    }
    catch (err) {
        console.error(e)
    }
};

export default GenrateToken;