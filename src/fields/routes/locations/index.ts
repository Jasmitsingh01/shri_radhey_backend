import  Express  from "express";
import {Allcity,Allstate,Allcountry} from "../../controller/location/all";
import { Createcity, CreateCountry, Createstate } from "../../controller/location/create";
import { updatecity, updatecountry, updatestate } from "../../controller/location/update";
import { delcity,delcountry,delstate} from "../../controller/location/delete";


const locationRouter = Express.Router();


locationRouter.get('/country', Allcountry)
locationRouter.get('/state', Allstate)
locationRouter.get('/city', Allcity)

locationRouter.post('/create/country', CreateCountry as any)
locationRouter.post('/create/state', Createstate)
locationRouter.post('/create/city', Createcity)



locationRouter.put('/update/country', updatecountry)
locationRouter.put('/update/state', updatestate)
locationRouter.put('/update/city', updatecity)




locationRouter.delete('/delete/country', delcountry)
locationRouter.delete('/delete/city', delcity)
locationRouter.delete('/delete/state', delstate)





export default locationRouter;