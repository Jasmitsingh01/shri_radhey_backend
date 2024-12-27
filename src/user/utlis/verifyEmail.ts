import RequestHandler from "../utlis/request/requestHandler";
import EmpolyeeUser from "../models/user.model";
import error from "../utlis/error/Error";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
const VeryfyEmail = RequestHandler(async (req: Request, res: Response) => {
    try {
        // Your code here
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new error("Validation Error", 400);
        }
        const {  email,code } = req.body;
        const user = await EmpolyeeUser.findOne({ "contact_Details.email":email || '' });
        if (!user) {
            throw new error("User not found", 404);
        }
        if (user.empoylee_deatils.code_email !== code) {
            throw new error("Invalid Code", 404);
        }
        user.empoylee_deatils.is_verfied_email = true;
        user.empoylee_deatils.code_email='';
        await user.save();
        const Data = new ResponseData(user, 200, 'Email Verified');
        ResponseHandler(res, Data, 200);
    } catch (error) {
        console.error(error);
        const response = new ResponseData(error, (error as any)?.statusCode , (error as any)?.message );

        ResponseHandler(res,response , (error as any)?.statusCode);
    }
});


export default VeryfyEmail;