import  Express  from "express";
import AllComplexion from "../../controller/complexion/all";
import CreateComplexion from "../../controller/complexion/create";
import updateComplexion from "../../controller/complexion/update";
import delcomplexion from "../../controller/complexion/delete";
import auth from "../../middleware/auth";


const complexionRouter=Express.Router();




complexionRouter.get('/',AllComplexion as any)

complexionRouter.post('/create', auth as any,CreateComplexion as any)

complexionRouter.put('/update',auth as any,updateComplexion as any)


complexionRouter.delete('/delete',auth as any,delcomplexion as any)

export default complexionRouter;