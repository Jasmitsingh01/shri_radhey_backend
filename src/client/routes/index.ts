import Express from 'express';
declare module 'express' {
    interface Request {
        user: any;
    }
}
import auth from '../middleware/auth';
import ALLclient from '../controllers/all';
import CreateClient from '../controllers/create';
import updateField from '../controllers/update.field';
import delClient from '../controllers/delete';
import upload from '../middleware/ImageSaver';
import FindClient from '../controllers/find';
import SimilarClient from '../controllers/Match';


const  router = Express.Router();


router.get('/client',auth as any , ALLclient as any);

router.post('/create-client' , auth as any ,upload.single('profile_image') ,CreateClient as any);

router.patch('/field-client', auth as any ,    upload.single('profile_image')   ,updateField as any);

router.delete('/delete-client', auth as any, delClient as any);

router.get('/client/:id', auth as any, FindClient as any);

router.post('/match-client', auth as any, SimilarClient as any);


export  default router;