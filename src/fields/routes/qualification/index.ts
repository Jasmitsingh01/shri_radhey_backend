import  Express  from "express";
import Allqualification from "../../controller/qualification/all";
import CreateQualification from "../../controller/qualification/create";
import updatequalification from "../../controller/qualification/update";
import delqualification from "../../controller/qualification/delete";
import auth from "../../middleware/auth";


const qualificationRouter=Express.Router();



qualificationRouter.get('/',Allqualification as any)

qualificationRouter.post('/create',auth as any,CreateQualification as any)

qualificationRouter.put('/update',auth as any,updatequalification as any)


qualificationRouter.delete('/delete',auth as any,delqualification as any)


export default qualificationRouter;