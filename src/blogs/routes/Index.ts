import Express from 'express'
import createBlogs from '../controllers/create';
import auth from '../middleware/auth';
import updateBlogs from '../controllers/update';
import DisplayBlogs from '../controllers/display';
import AllBlogsUSer from '../controllers/allUser';
import DelBlogs from '../controllers/delete';
import AllBlogs from '../controllers/all';
import upload from '../middleware/upload.image';
declare module 'express' {
    interface Request {
        user: any;
    }
}

const router = Express.Router();


router.post('/create', auth as any, upload.single('thumbnail') ,createBlogs as any);
router.put('/update', auth as any, upload.single('thumbnail') ,updateBlogs as any)
router.get('/blog/display/:id', DisplayBlogs as any)
router.get('/user/blog', auth as any, AllBlogsUSer as any)
router.get('/',AllBlogs as any)
router.delete('/del/blog', auth as any, DelBlogs as any)


export default router;