import Express from 'express'
import auth from '../middleware/auth';
import CreateTak from '../controllers/create';
import { body,query } from 'express-validator';
import ALLTASK from '../controllers/all';
import updatetaskField from '../controllers/update.field';
import ResponseTask from '../controllers/response';
import Deltask from '../controllers/delete';
import SingleTask from '../controllers/single';
const router = Express.Router();


router.post('/task-create',auth as any, CreateTak as any)
router.get('/',auth as any,ALLTASK as any);
router.put('/task-update',auth as any,updatetaskField as any);
router.patch('/response-task',auth as any,ResponseTask as any);
router.delete('/del-tak',auth as any, Deltask as any)
router.get('/single',auth as any,SingleTask as any)

export default router;