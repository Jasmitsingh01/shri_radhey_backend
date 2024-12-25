import EmpolyeeUser from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import RequestHandler from "../utlis/request/requestHandler";
import error from "../utlis/error/Error";
import { validationResult } from "express-validator";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import GenrateToken from "../utlis/genrateToken";
import fs from 'fs'
import path from "path";
const Register = RequestHandler(async (req: Request, res: Response,next:NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new error("Validation Error", 400);
        }
        const { name, email, password, role, phone, address, city, state, zip, country } = req.body;
        const user = new EmpolyeeUser({
            fullname: {
                firstName: name.split(' ')[0],
                lastName: name.split(' ')[1],
            }
            ,
            contact_Details: {
                email,
                phone
            },
            password,
            empoylee_deatils: {
               emp_role: role,
            },
            address: {
                fulladdress: address,
                city,
                state,
                country,
                pincode: zip
            },

        });
        const save = await user.save();
        if (!save) {
            throw new error("User not saved", 500);
        }
        req.user=save;
        await GenrateToken(req,res);
     const Newuser={
        ...save.toObject(),
        password: undefined
     }

        const response = new ResponseData(Newuser, 201, "User Created");
        ResponseHandler(res, response, 201);
    }
    catch (err) {
        console.error(err);
    }


});




export default Register;