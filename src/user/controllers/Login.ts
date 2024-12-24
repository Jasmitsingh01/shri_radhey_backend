import RequestHandler from "../../utlis/request/requestHandler";
import EmpolyeeUser from "../models/user.model";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
import { NextFunction, Request,Response } from "express";
import GenrateToken from "../utlis/genrateToken";
import { validationResult } from "express-validator";
import error from "../../utlis/error/Error";
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
            }
        
});
export default Login;