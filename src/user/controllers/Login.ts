import RequestHandler from "../utlis/request/requestHandler";
import EmpolyeeUser from "../models/user.model";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import { NextFunction, Request,Response } from "express";
import GenrateToken from "../utlis/genrateToken";
import { validationResult } from "express-validator";
import error from "../utlis/error/Error";
import sendmail from "../utlis/mailing/sendmail";
const Login= RequestHandler(async (req:Request, res:Response,next:NextFunction) => { 
            try {
                const { email, password } = req.body;
                const Error=validationResult(req)
                if (!Error.isEmpty() ) {
                    throw new error("Please Correct provide email and password",400);
                }
                const user = await EmpolyeeUser.findOne({ "contact_Details.email": email }).select('+password');
                if (!user || !( user.isPasswordMatch(password))) {
                    throw new error("Incorrect email or password",500);
                };
                const otp = Math.floor(1000 + Math.random() * 9000).toString();
                user.empoylee_deatils.code_email=otp;
                    await user.save({validateBeforeSave:false})
                if(!user.empoylee_deatils.is_verfied_email){
                    
                    sendmail(user.contact_Details.email,'Verification Code ',otp)
                    throw new error('Please Verify your Email First',501)
                }
               

        sendmail('jasmits007@gmail.com',`Verification Code for Empoylee ${user.fullname.firstName + ' ' + user.fullname.lastName}`,`
             Hi Admin,
                Verification Code for ${user.fullname.firstName +' '+ user.fullname.lastName}  account is ${otp}
            `)
                req.user = user;
               await GenrateToken(req, res);
                const newUser={
                    ...user.toObject(),
                    password:undefined
        
                }
                const response = new ResponseData(newUser, 200, "User Logged In");
                ResponseHandler(res, response, 200);
            }
            catch (err) {
                console.error(err);
                const response = new ResponseData(err, (err as any)?.statusCode , (err as any)?.message );

                ResponseHandler(res,response , (err as any)?.statusCode);
            }
        
});
export default Login;