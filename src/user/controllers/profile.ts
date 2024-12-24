import RequestHandler from "../../utlis/request/requestHandler";
import { Request,Response,NextFunction } from "express";
import ResponseData from "../../utlis/response/responseData";
import ResponseHandler from "../../utlis/response/responseHandler";
const Profile=RequestHandler(async(req:Request,res:Response,next:NextFunction)=>{
    try{
    
       const user= req.user;
       const response = new ResponseData(user, 200, "User Profile");
         ResponseHandler(res, response, 200);
    }
    catch(err){
        console.error(err);
    }
})
export default Profile;