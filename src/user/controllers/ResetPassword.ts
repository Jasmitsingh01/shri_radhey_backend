import EmpolyeeUser from "../models/user.model";
import error from "../utlis/error/Error";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import sendmail from "../utlis/mailing/sendmail";
import RequestHandler from "../utlis/request/requestHandler";
import bcrypt from "bcryptjs";

const ResetPassword = RequestHandler(async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new error("Validation Error", 400);
        }
        const { email, password, code } = req.body;
        const user = await EmpolyeeUser.findOne({ "contact_Details.email": email });
        if (!user) {
            throw new error("User not found", 404);
        }
        if (user.empoylee_deatils.code_email !== code) {
            throw new error("Invalid Code", 404);
        }
        const hashPass=await bcrypt.hash(password,10);
        user.password = hashPass;
        await user.save({ validateBeforeSave: false });
        const Data = new ResponseData('', 200, 'Password Reset Successfully');
        ResponseHandler(res, Data, 200);
    } catch (error) {
        console.error(error);

    }
});


export default ResetPassword;