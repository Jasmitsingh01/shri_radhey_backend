import axios from "axios";
import RequestHandler from "../utlis/request/requestHandler";
import { Request, Response, NextFunction } from "express";
import error from "../utlis/error/Error";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";

/**
 * Middleware to handle authentication.
 * 
 * This middleware function checks for the presence of an access token in the request cookies or authorization headers.
 * If a token is found, it verifies the token by making a request to the user service.
 * If the token is valid, the user data is attached to the request object and the next middleware is called.
 * If the token is invalid or not present, an error is thrown.
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * 
 * @throws {Error} If the request is invalid or unauthorized.
 */
const auth = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {
   try {
      const token = req?.cookies?.access_token || req.headers.authorization?.split('Bearer ')[1]
      if (!token) {
         throw new error('Invaild request', 400);
      }
      const verify = await axios.get('http://host.docker.internal:9000/user', {
         headers: {
            'Authorization': `Bearer ${token}`, // Adding authoziation Token TO Headers
         }
      });

      if (verify.status !== 200) {
         throw new error('Unauthorized', 401);
      }
      
      req.user = verify.data?.data;
      next();

   }
   catch (error) {
      console.error(error)
      const response = new ResponseData(error, (error as any).statusCode || (error as any).status || 500, (error as any).message);

      ResponseHandler(res, response, (error as any).statusCode || (error as any).status || 500)
   }
})

export default auth