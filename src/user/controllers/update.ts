import EmpolyeeUser from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import RequestHandler from "../utlis/request/requestHandler";
import error from "../utlis/error/Error";
import { validationResult } from "express-validator";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";


const Userupdate = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {

    try {

        const Data = req.body
        const user = req.user;
        const update = await EmpolyeeUser.findByIdAndUpdate(user?._id, {
            fullname:{
                firstName:Data?.fullname?.fullname?.split(' ')[0],
                lastName:Data?.fullname?.fullname?.split(' ')[1]
            },
            contact_Details:{
                phone:Data?.contact?.phone,
                email:Data?.contact?.email
            },
            gender:Data?.gender,
            profile_image:Data?.profile_image,
            address:{
                fulladdress:Data?.address
            }
        })
        if (!update) {
            throw new error("Failed to update Empolyee", 500);


        }

        const response = new ResponseData(update, 200, 'Empolyee Update Successfully');
        ResponseHandler(res, response, 200)
    } catch (error) {

        console.error(error)
        const response= new ResponseData(error,(error as any).statusCode || (error as any).status || 500,(error as any).message);

        ResponseHandler(res,response,(error as any).statusCode || (error as any).status || 500)
    }
})


export default Userupdate