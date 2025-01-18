
import RequestHandler from "../utlis/request/requestHandler";
import EmpolyeeUser from "../models/user.model";
import error from "../utlis/error/Error";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import sendmail from "../utlis/mailing/sendmail";
import fs from 'fs'
import path from "path";
const forgotPassword = RequestHandler(async (req:Request, res:Response) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new error("Validation Error", 400);
        }
        console.log(req.body)
        const { email } = req.body;
        const user = await EmpolyeeUser.findOne({ "contact_Details.email": email });
        if (!user) {
            throw new error("User not found", 404);
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.empoylee_deatils.code_email=otp;
         await user.save({validateBeforeSave:false});
         fs.readFile(path.join(__dirname,"../../public/template/verification_code.html"),'utf8',async (err,data)=>{
            if(err){
                console.error(err)
            }
            else{
                const HTMLTEMPLATE=data.toString().replace('<div class="verification-code"></div>',`<div class="verification-code">${otp}</div>`)
            await    sendmail(user.contact_Details.email, 'Verification Code ', HTMLTEMPLATE)

            }
        })
        const Data= new ResponseData({
            email:user.contact_Details.email
        },200,'Verfication Code Sent to your email');
        ResponseHandler(res,Data,200);

        

    }
    catch (err) {
        console.error(err);
        const response = new ResponseData(err, (err as any)?.statusCode , (err as any)?.message );

        ResponseHandler(res,response , (err as any)?.statusCode);
    }
}
);
export default forgotPassword;