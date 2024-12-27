import  Express  from "express";
import Allqualification from "../../controller/qualification/all";
import CreateQualification from "../../controller/qualification/create";
import updatequalification from "../../controller/qualification/update";
import delqualification from "../../controller/qualification/delete";


const qualificationRouter=Express.Router();



qualificationRouter.get('/',Allqualification)

qualificationRouter.post('/create',CreateQualification)

qualificationRouter.put('/update',updatequalification)


qualificationRouter.delete('/delete',delqualification)


export default qualificationRouter;