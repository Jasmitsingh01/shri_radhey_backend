import  Express  from "express";
import AllOccupation from "../../controller/occupation/all";
import CreateOccupation from "../../controller/occupation/create";
import updateoccupation from "../../controller/occupation/update";
import deloccupation from "../../controller/occupation/delete";


const OccupationRouter=Express.Router();


OccupationRouter.get('/',AllOccupation)

OccupationRouter.post('/create',CreateOccupation)

OccupationRouter.put('/update',updateoccupation)


OccupationRouter.delete('/delete',deloccupation)



export default OccupationRouter;