
import EmpolyeeUser from "../models/user.model";
import error from "./error/Error";


async function ID_offline (user_id:string){
    try {
     
      if(!user_id){
        throw new error("Invaild user_id",400)
      }
      const find=await EmpolyeeUser.findById(
        user_id
      );
      if(!find){
        throw new error('No user employee found',404)
      }  ;
      find.empoylee_deatils.is_active=false;

      const save=await find.save({
    validateBeforeSave:false
      });
      if(!save){
        throw new error('something went wrong',500)
      }


    } catch (error) {
      console.log(error)  
    }

}

export default ID_offline;