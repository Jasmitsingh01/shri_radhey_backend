import Express from "express";
import { Allcaste, Allgotra, Allreligion } from "../../controller/ethinicity/all";
import { CreateCaste, CreateGotra, CreateReligion } from "../../controller/ethinicity/create";
import { updatecaste, updategotra, updateregilion } from "../../controller/ethinicity/update";
import { delcaste, delgotra, delreligion } from "../../controller/ethinicity/delete";
import auth from "../../middleware/auth";


const ethinicityRouter = Express.Router();


ethinicityRouter.get('/religion', Allreligion as any)
ethinicityRouter.get('/caste', Allcaste as any)
ethinicityRouter.get('/gotra', Allgotra as any)




ethinicityRouter.post('/create/religion',auth as any, CreateReligion as any)
ethinicityRouter.post('/create/caste',auth as any, CreateCaste as any)
ethinicityRouter.post('/create/gotra', auth as any,CreateGotra as any)



ethinicityRouter.put('/update/religion',auth as any, updateregilion as any)
ethinicityRouter.put('/update/caste', auth as any,updatecaste as any)
ethinicityRouter.put('/update/gotra', auth as any,updategotra as any)




ethinicityRouter.delete('/delete/religion',auth as any, delreligion as any)
ethinicityRouter.delete('/delete/caste',auth as any, delcaste as any)
ethinicityRouter.delete('/delete/gotra',auth as any, delgotra as any)





export default ethinicityRouter;