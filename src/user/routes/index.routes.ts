import express from 'express';
import { body } from 'express-validator'
import Register from '../controllers/Register';
import Login from '../controllers/Login';
import auth from '../middleware/auth';
import Profile from '../controllers/profile';
import forgotPassword from '../controllers/Forgot-password';
import ResetPassword from '../controllers/ResetPassword';
import Userdelete from '../controllers/Delete';
import Userupdate from '../controllers/update';
import refresh_Token from '../utlis/refresh_Token';
import Userall from '../controllers/all_user';
import VeryfyEmail from '../utlis/verifyEmail';

const router=express.Router();

router.post('/register', Register as any);

router.post('/create', Register as any);

router.post('/login', [body('email').isEmail(),body('password').isLength({min:6})],Login as any);

router.post('/forgot-password',[body('email').isEmail()],forgotPassword as any);

router.patch('/reset-password',[body('email').isEmail(),body('password').isLength({min:6}),body('code').isLength({min:4,max:4})],ResetPassword as any);

router.patch('/refresh-token',refresh_Token as any);


router.post('/verfiy-email',[body('email').isEmail(),body('code').isLength({min:4,max:4})],VeryfyEmail as any)

router.get('/user',auth as any,Profile as any)
router.put('/user',auth as any ,Userupdate as any)
router.delete('/user',auth as any ,Userdelete as any)

router.get('/list-user',auth as any ,Userall as any)

export default router;