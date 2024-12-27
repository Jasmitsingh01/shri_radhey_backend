import  Express  from "express";
import AllComplexion from "../../controller/complexion/all";
import CreateComplexion from "../../controller/complexion/create";
import updateComplexion from "../../controller/complexion/update";
import delcomplexion from "../../controller/complexion/delete";


const complexionRouter=Express.Router();




complexionRouter.get('/',AllComplexion)

complexionRouter.post('/create',CreateComplexion)

complexionRouter.put('/update',updateComplexion)


complexionRouter.delete('/delete',delcomplexion)

export default complexionRouter;