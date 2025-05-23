import EmpolyeeUser from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import RequestHandler from "../utlis/request/requestHandler";
import error from "../utlis/error/Error";
import { validationResult } from "express-validator";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import fs from 'fs'
import path from "path";
import sendmail from "../utlis/mailing/sendmail";
const Create = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new error("Validation Error", 400);
        }
        const { name, email, password, role, phone, address, city, state, zip, country } = req.body;


        // for gentrating otp
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const user = new EmpolyeeUser({
            fullname: {
                firstName: name.split(' ')[0],
                lastName: name.split(' ')[1],
            }
            ,
            contact_Details: {
                email:email,
                phone:phone
            },
            password,
            empoylee_deatils: {
                emp_role: role,
                code_email: otp
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
     fs.readFile(path.resolve(__dirname, '../public/template/welcome.html'), async (err, data) => {
            if (err) {
                const del = await EmpolyeeUser.deleteOne({
                    _id: user._id
                });
                if (!del) {
                    process.exit(1);
                }
                throw new error('Failed to load Mail data', 500)
            };
            const Email = data.toString()?.replace('<h1>Congratulations  !</h1>', `<h1>Congratulations ${user.fullname?.firstName + ' ' + user.fullname?.lastName} !</h1>`)?.replace('<div id="code"></div>',`<div id="code">Your Verification Code <strong>${otp}</strong></div>`);

         await   sendmail(user.contact_Details.email, 'Welcome Email From Shri Radhey Materimonay', Email);
    })



        const Newuser = {
            ...save.toObject(),
            password: undefined
        }

        const response = new ResponseData(Newuser, 201, "User Created");
        ResponseHandler(res, response, 201);
    }
    catch (err) {
        console.error(err);
        const response= new ResponseData(err,(err as any).statusCode || (err as any).status || 500,(err as any).message);

        ResponseHandler(res,response,(err as any).statusCode || (err as any).status || 500)
    }


});




export default Create;