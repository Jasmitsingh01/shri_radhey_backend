import axios, { AxiosError } from "axios";
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
      try {
         const verify = await axios.get('http://user_container:9000/user', {
            headers: {
               'Authorization': `Bearer ${token}`, // Adding authoziation Token TO Headers
            },

         });
         req.user = verify.data?.data;
         next();

      } catch (err: any) {

         if (err?.response?.status === 401) {
            const refreshToken = req?.cookies?.refresh_token || req.headers.authorization?.split('Bearer ')[2]
            if (!refreshToken) {
               throw new error('Access Deined', 401)
            }
            try {
               const refreshing = await axios.patch('http://user_container:9000/refresh-token', {}, {
                  headers: {
                     'Authorization': `Bearer ${refreshToken}`,
                  }
               })
               if (!refreshing.data?.data) {
                  throw new error('Invaild request', 402)
               }
               const newToken = refreshing.data?.data?.access_token
               if (!newToken) {
                  throw new error('Invaild request', 402)

               }
               const verify = await axios.get('http://user_container:9000/user', {
                  headers: {
                     'Authorization': `Bearer ${newToken}`, // Adding authoziation Token TO Headers
                  },

               });
               req.user = verify.data?.data;
               next();
            } catch (err: any) {
               throw err
            }

         }
      }
   }
   catch (error) {
      const response = new ResponseData(error, (error as any).statusCode || (error as any).status || 500, (error as any).message);
      ResponseHandler(res, response, (error as any).statusCode || (error as any).status || 500)
   }
})

export default auth