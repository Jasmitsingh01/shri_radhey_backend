import  Express  from "express";
import AllOccupation from "../../controller/occupation/all";
import CreateOccupation from "../../controller/occupation/create";
import updateoccupation from "../../controller/occupation/update";
import deloccupation from "../../controller/occupation/delete";
import auth from "../../middleware/auth";


const OccupationRouter=Express.Router();


OccupationRouter.get('/',AllOccupation as any)

OccupationRouter.post('/create',auth as any,CreateOccupation as any)

OccupationRouter.put('/update',auth as any ,updateoccupation as any)


OccupationRouter.delete('/delete',auth as any,deloccupation as any)



export default OccupationRouter;