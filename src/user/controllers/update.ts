import EmpolyeeUser from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import RequestHandler from "../utlis/request/requestHandler";
import error from "../utlis/error/Error";
import { validationResult } from "express-validator";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import UploadImageOnline from "../utlis/cloudnairy";


const Userupdate = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const Data = req.body
        const user = req.user;
        if (!Data) {
            throw new error('Invalid Request', 400)
        }
        const file = req.file;

        let imageurl;
        if (file) {
            imageurl = await UploadImageOnline(file?.path || '')
        }

        const update = await EmpolyeeUser.findById(user?._id)
        if (!update) {
            throw new error("Failed to update Empolyee", 500);
        }
        update.fullname.firstName = Data?.fullname?.fullname?.split(' ')[0];
        update.fullname.lastName = Data?.fullname?.fullname?.split(' ')[1];
        update.contact_Details.email = Data?.contact?.email;
        update.contact_Details.phone = Data?.contact?.phone;
        update.gender = Data?.gender;
        if (file) {
            update.profile_pic = imageurl || ''
        }
        update.address.fulladdress = Data?.address

        const save = await update.save({
            validateBeforeSave: false
        });
        if (!save) {
            throw new error('Failed to Update user', 500)
        }



        const response = new ResponseData(save, 200, 'Empolyee Update Successfully');
        ResponseHandler(res, response, 200)
    } catch (error) {

        console.error(error)
        const response = new ResponseData(error, (error as any).statusCode || (error as any).status || 500, (error as any).message);

        ResponseHandler(res, response, (error as any).statusCode || (error as any).status || 500)
    }
})


export default Userupdate