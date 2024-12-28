import Express from "express";
import { Allcaste, Allgotra, Allreligion } from "../../controller/ethinicity/all";
import { CreateCaste, CreateGotra, CreateReligion } from "../../controller/ethinicity/create";
import { updatecaste, updategotra, updateregilion } from "../../controller/ethinicity/update";
import { delcaste, delgotra, delreligion } from "../../controller/ethinicity/delete";


const ethinicityRouter = Express.Router();


ethinicityRouter.get('/religion', Allreligion)
ethinicityRouter.get('/caste', Allcaste)
ethinicityRouter.get('/gotra', Allgotra)




ethinicityRouter.post('/create/religion', CreateReligion)
ethinicityRouter.post('/create/caste', CreateCaste)
ethinicityRouter.post('/create/gotra', CreateGotra)



ethinicityRouter.put('/update/religion', updateregilion)
ethinicityRouter.put('/update/caste', updatecaste)
ethinicityRouter.put('/update/gotra', updategotra)




ethinicityRouter.delete('/delete/religion', delreligion)
ethinicityRouter.delete('/delete/caste', delcaste)
ethinicityRouter.delete('/delete/gotra', delgotra)





export default ethinicityRouter;