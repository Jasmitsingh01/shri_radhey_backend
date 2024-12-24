import express from 'express';
import { query,body } from 'express-validator'
import Register from '../controllers/Register';
import Login from '../controllers/Login';
import auth from '../middleware/auth';
import Profile from '../controllers/profile';
import forgotPassword from '../controllers/Forgot-password';
import ResetPassword from '../controllers/ResetPassword';


const router=express.Router();

router.post('/register', Register as any);

router.post('/login', [body('email').isEmail(),body('password').isLength({min:6})],Login as any);

router.post('/forgot-password',query('email').isEmail(),query('phone').isLength({min:10}),forgotPassword as any);

router.patch('/reset-password',query('email').isEmail(),query('password').isLength({min:6}),query('code').isLength({min:6}),ResetPassword as any);



router.get('/user',auth as any,Profile as any);


export default router;