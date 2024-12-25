import Express from 'express'
declare module 'express' {
    interface Request {
        user: any;
    }
}

const router = Express.Router();







export default router;