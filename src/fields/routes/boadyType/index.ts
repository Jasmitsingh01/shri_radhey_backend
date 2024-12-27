import  Express  from "express";
import Allbodytype from "../../controller/boadyType/all";
import CreateBodytype from "../../controller/boadyType/create";
import updatebodytype from "../../controller/boadyType/update";
import delBodyType from "../../controller/boadyType/delete";


const Boadyrouter=Express.Router();


Boadyrouter.get('/',Allbodytype)

Boadyrouter.post('/create',CreateBodytype)

Boadyrouter.put('/update',updatebodytype)


Boadyrouter.delete('/delete',delBodyType)


export default Boadyrouter;