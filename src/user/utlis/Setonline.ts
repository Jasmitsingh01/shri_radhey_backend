import { config } from 'dotenv';
config({
  path:'../*.env'
})
import jwt  from 'jsonwebtoken';
import EmpolyeeUser from "../models/user.model";
import error from "./error/Error";

async function online (user_token:string){
    try {

      const verfiy=jwt.verify(user_token,process.env.JWT_SECRET_KEY_Access_Token as string);
      if(!verfiy){
        throw new error("Invaild Token",400)
      }
      const user_id=(verfiy as any)?._id
      if(!user_id){
        throw new error("Invaild user_id",400)
      }
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