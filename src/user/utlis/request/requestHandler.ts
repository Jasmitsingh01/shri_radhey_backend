import { Request, Response, NextFunction } from 'express';
function RequestHandler(func: Function):any {
    return async (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(func(req, res, next)).catch((err) => {
            next(err);
        });
    };
};

export default RequestHandler;