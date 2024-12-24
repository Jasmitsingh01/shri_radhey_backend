import { Schema,model } from "mongoose";


const qualificationModel=new Schema({
    qualification:{
        type:String,
        require:true,
    }
});

const qualification=model('qualification',qualificationModel);

export default qualification;