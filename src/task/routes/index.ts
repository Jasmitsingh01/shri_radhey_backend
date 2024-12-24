import Express from 'express'
import auth from '../middleware/auth';
import CreateTak from '../controllers/create';
import { body,query } from 'express-validator';
const router = Express.Router();


router.post('/task-create',auth as any, CreateTak as any)
router.get('/',auth as any);
router.put('/task-update',auth as any);
router.patch('/response-task',auth as any)
router.delete('/del-tak',auth as any)
router.get('/single',auth as any)

export default router;