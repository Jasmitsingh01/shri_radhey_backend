
import EmpolyeeUser from "../models/user.model";
import error from "./error/Error";

async function online (user_id:string){
    try {

   
      const find=await EmpolyeeUser.findById(
        user_id
      );
      if(!find){
        throw new error('No user employee found',404)
      }  ;
      find.empoylee_deatils.is_active=true;

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

export default online