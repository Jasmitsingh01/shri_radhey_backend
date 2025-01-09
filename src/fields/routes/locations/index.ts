import  Express  from "express";
import {Allcity,Allstate,Allcountry} from "../../controller/location/all";
import { Createcity, CreateCountry, Createstate } from "../../controller/location/create";
import { updatecity, updatecountry, updatestate } from "../../controller/location/update";
import { delcity,delcountry,delstate} from "../../controller/location/delete";
import auth from "../../middleware/auth";


const locationRouter = Express.Router();


locationRouter.get('/country', Allcountry as any)
locationRouter.get('/state', Allstate as any)
locationRouter.get('/city', Allcity as any)

locationRouter.post('/create/country', auth as any,CreateCountry as any)
locationRouter.post('/create/state', auth as any,Createstate as any)
locationRouter.post('/create/city',auth as any, Createcity as any)



locationRouter.put('/update/country', auth as any,updatecountry as any)
locationRouter.put('/update/state', auth as any,updatestate as any)
locationRouter.put('/update/city',auth as any, updatecity as any)




locationRouter.delete('/delete/country',auth as any, delcountry as any)
locationRouter.delete('/delete/city',auth as any, delcity as any)
locationRouter.delete('/delete/state',auth as any, delstate as any)





export default locationRouter;