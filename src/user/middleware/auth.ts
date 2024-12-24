
import jwt from 'jsonwebtoken';

import EmpolyeeUser from '../models/user.model';
import RequestHandler from '../../utlis/request/requestHandler';
import { Request, Response, NextFunction } from 'express';
import error from '../../utlis/error/Error';
declare module 'express' {
    interface Request {
        user: any;
    }
}
const auth = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.cookies?.access_token || req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
        throw new error('Token not found', 400);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    const user = await EmpolyeeUser.findById((decoded as any )._id);

    if (!user) {
        throw new error('User not found', 404);
    }

    req.user = user;

    next();
});

export default auth;