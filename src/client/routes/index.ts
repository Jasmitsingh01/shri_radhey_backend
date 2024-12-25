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

const  router = Express.Router();


router.get('/client',auth as any , ALLclient as any);

router.post('/create-client',auth as any , CreateClient as any);

router.patch('/field-client', auth as any , updateField as any);

router.delete('/delete-client', auth as any, delClient as any);


export  default router;