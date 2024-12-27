import Express from "express";
import Allethinicity from "../../controller/ethinicity/all";
import { CreateCaste, CreateGotra, CreateReligion } from "../../controller/ethinicity/create";
import { updatecaste, updategotra, updateregilion } from "../../controller/ethinicity/update";
import delethinicity from "../../controller/ethinicity/delete";


const ethinicityRouter = Express.Router();


ethinicityRouter.get('/', Allethinicity)

ethinicityRouter.post('/create/religion', CreateReligion)
ethinicityRouter.post('/create/caste', CreateCaste)
ethinicityRouter.post('/create/gotra', CreateGotra)



ethinicityRouter.put('/update/religion', updateregilion)
ethinicityRouter.put('/update/caste', updatecaste)
ethinicityRouter.put('/update/gotra', updategotra)




ethinicityRouter.delete('/delete/religion', delethinicity)



export default ethinicityRouter;