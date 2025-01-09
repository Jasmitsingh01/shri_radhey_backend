import  Express  from "express";
import Allbodytype from "../../controller/boadyType/all";
import CreateBodytype from "../../controller/boadyType/create";
import updatebodytype from "../../controller/boadyType/update";
import delBodyType from "../../controller/boadyType/delete";
import auth from "../../middleware/auth";


const Boadyrouter=Express.Router();


Boadyrouter.get('/',Allbodytype as any)

Boadyrouter.post('/create', auth as any ,CreateBodytype as any)

Boadyrouter.put('/update', auth as any ,updatebodytype as any)


Boadyrouter.delete('/delete',auth as any, delBodyType as any)


export default Boadyrouter;