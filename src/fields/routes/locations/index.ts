import  Express  from "express";
import Alllocation from "../../controller/location/all";
import { Createcity, CreateCountry, Createstate } from "../../controller/location/create";
import { updatecity, updatecountry, updatestate } from "../../controller/location/update";
import dellocation from "../../controller/location/delete";


const locationRouter = Express.Router();


locationRouter.get('/', Alllocation)

locationRouter.post('/create/country', CreateCountry)
locationRouter.post('/create/state', Createstate)
locationRouter.post('/create/city', Createcity)



locationRouter.put('/update/country', updatecountry)
locationRouter.put('/update/state', updatestate)
locationRouter.put('/update/city', updatecity)




locationRouter.delete('/delete/country', dellocation)



export default locationRouter;